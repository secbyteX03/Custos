/**
 * Dead Man's Switch scheduler unit tests
 * Run with: jest
 */
const { runSwitchCheck } = require('../jobs/scheduler');

// Mock Prisma and services
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    deadMansSwitch: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});
jest.mock('../services/notification', () => ({
  sendMultiChannelAlert: jest.fn().mockResolvedValue(true),
}));
jest.mock('../services/inheritance', () => ({
  triggerInheritanceProtocol: jest.fn().mockResolvedValue(true),
}));

const { PrismaClient } = require('@prisma/client');
const { sendMultiChannelAlert } = require('../services/notification');
const { triggerInheritanceProtocol } = require('../services/inheritance');
const prisma = new PrismaClient();

describe('Dead Man\'s Switch scheduler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    prisma.deadMansSwitch.findMany.mockResolvedValue([]);
    prisma.deadMansSwitch.update.mockResolvedValue({});
  });

  test('transitions ACTIVE user to PENDING_WARNING when check-in is overdue', async () => {
    const overdueUser = {
      id: 'sw-1',
      userId: 'user-1',
      state: 'ACTIVE',
      nextCheckinDue: new Date(Date.now() - 2 * 86400000), // 2 days ago
      user: { id: 'user-1', email: 'robert@test.com', pushToken: null, phone: null },
    };

    prisma.deadMansSwitch.findMany
      .mockResolvedValueOnce([overdueUser]) // ACTIVE query
      .mockResolvedValueOnce([])            // PENDING_WARNING query
      .mockResolvedValueOnce([]);           // GRACE_PERIOD query

    await runSwitchCheck();

    expect(prisma.deadMansSwitch.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ state: 'PENDING_WARNING' }) })
    );
    expect(sendMultiChannelAlert).toHaveBeenCalledWith(
      overdueUser.user, 'CHECKIN_REMINDER', { urgency: 'NORMAL' }
    );
  });

  test('triggers inheritance protocol when grace period expires', async () => {
    const gracePeriodExpired = {
      id: 'sw-2',
      userId: 'user-2',
      state: 'GRACE_PERIOD',
      gracePeriodDays: 30,
      gracePeriodStartedAt: new Date(Date.now() - 31 * 86400000), // 31 days ago
      sarahNotifiedAt: new Date(),
      user: { id: 'user-2', email: 'robert2@test.com', pushToken: null, phone: null, trustedContacts: [] },
    };

    prisma.deadMansSwitch.findMany
      .mockResolvedValueOnce([])                   // ACTIVE query
      .mockResolvedValueOnce([])                   // PENDING_WARNING query
      .mockResolvedValueOnce([gracePeriodExpired]); // GRACE_PERIOD query

    await runSwitchCheck();

    expect(triggerInheritanceProtocol).toHaveBeenCalledWith(gracePeriodExpired);
  });

  test('does NOT trigger when user checks in before grace period expires', async () => {
    prisma.deadMansSwitch.findMany.mockResolvedValue([]);
    await runSwitchCheck();
    expect(triggerInheritanceProtocol).not.toHaveBeenCalled();
  });
});
