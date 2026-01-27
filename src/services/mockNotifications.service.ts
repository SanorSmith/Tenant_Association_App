import type { Meeting, Booking, Document, User } from '../types';

export type NotificationType = 'email' | 'sms' | 'both';

export interface Notification {
  id: string;
  type: NotificationType;
  to: string;
  subject?: string;
  message: string;
  sentAt: Date;
  status: 'sent' | 'failed';
}

export async function sendMeetingInvitation(
  meeting: Meeting,
  attendees: User[],
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📧 Mock: Meeting invitation sent to ${attendees.length} attendees`);
      console.log(`   Meeting: ${meeting.title}`);
      console.log(`   Date: ${new Date(meeting.date).toLocaleDateString('sv-SE')}`);
      resolve();
    }, 1000);
  });
}

export async function sendMeetingReminder(
  meeting: Meeting,
  attendees: User[],
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📧 Mock: Meeting reminder sent to ${attendees.length} attendees`);
      console.log(`   Meeting: ${meeting.title}`);
      resolve();
    }, 1000);
  });
}

export async function sendBookingConfirmation(
  booking: Booking,
  approved: boolean,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = approved ? 'godkänd' : 'avvisad';
      console.log(`📧 Mock: Booking ${status} notification sent to ${booking.requesterEmail}`);
      console.log(`   Requester: ${booking.requesterName}`);
      console.log(`   Date: ${new Date(booking.bookingDate).toLocaleDateString('sv-SE')}`);
      console.log(`   Time: ${booking.startTime} - ${booking.endTime}`);
      resolve();
    }, 1000);
  });
}

export async function sendDocumentEmail(
  document: Document,
  recipients: string[],
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📧 Mock: Document sent to ${recipients.join(', ')}`);
      console.log(`   Document: ${document.title}`);
      console.log(`   Type: ${document.documentType}`);
      resolve();
    }, 1000);
  });
}

export async function sendNotification(
  type: NotificationType,
  to: string,
  subject: string,
  message: string,
): Promise<Notification> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notification: Notification = {
        id: `notif-${Date.now()}`,
        type,
        to,
        subject,
        message,
        sentAt: new Date(),
        status: 'sent',
      };
      
      console.log(`📧 Mock Notification Sent:`);
      console.log(`   Type: ${type}`);
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Message: ${message}`);
      
      resolve(notification);
    }, 500);
  });
}
