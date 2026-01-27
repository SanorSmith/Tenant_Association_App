export type UserRole = 'administrator' | 'board_member' | 'official' | 'secretary' | 'treasurer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  notificationPreference: 'email' | 'sms' | 'both';
}

export interface Association {
  id: string;
  name: string;
  address: string;
  registrationNumber: string;
  verified: boolean;
}

export interface Meeting {
  id: string;
  associationId: string;
  title: string;
  type: 'board_meeting' | 'annual_meeting' | 'extraordinary_meeting';
  date: Date;
  location: string;
  description?: string;
  attendees: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  createdBy: string;
}

export interface MeetingAttendee {
  userId: string;
  rsvpStatus: 'attending' | 'not_attending' | 'maybe' | 'pending';
}

export interface Document {
  id: string;
  associationId: string;
  meetingId?: string;
  documentType: 'agenda' | 'minutes' | 'annual_minutes' | 'annual_report';
  title: string;
  content: any;
  version: number;
  status: 'draft' | 'finalized' | 'archived';
  finalizedAt?: Date;
  finalizedBy?: string;
}

export interface BudgetItem {
  id: string;
  associationId: string;
  category: string;
  description: string;
  amount: number;
  budgetYear: number;
  activityId?: string;
}

export interface Activity {
  id: string;
  associationId: string;
  title: string;
  description: string;
  activityDate: Date;
  location?: string;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Premises {
  id: string;
  associationId: string;
  name: string;
  address: string;
  spaceType: string;
  intendedUse: string;
  rules: string;
  capacity: number;
  isPublic: boolean;
}

export interface Booking {
  id: string;
  premisesId: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reviewedBy?: string;
  reviewedAt?: Date;
}
