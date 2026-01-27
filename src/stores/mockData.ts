import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User, Association, Meeting, Document, BudgetItem, Activity, Premises, Booking } from '../types';

export interface DocumentSection {
  id: string;
  title: string;
  type: 'text' | 'attendance' | 'list' | 'table';
  required: boolean;
  order: number;
  placeholder?: string;
  content?: any;
}

export interface DocumentTemplate {
  documentType: 'agenda' | 'minutes' | 'annual_minutes' | 'annual_report';
  sections: DocumentSection[];
}

export const useMockDataStore = defineStore('mockData', () => {
  const isAuthenticated = ref(false);
  
  const currentUser = ref<User>({
    id: 'user-1',
    fullName: 'Anna Andersson',
    email: 'anna.andersson@example.se',
    phone: '+46701234567',
    role: 'administrator',
    notificationPreference: 'both',
  });

  const currentAssociation = ref<Association>({
    id: 'assoc-1',
    name: 'Storvreta Hyresgäster',
    address: 'Storvreta, Uppsala',
    registrationNumber: 'HGF-2024-001',
    verified: true,
  });

  const boardMembers = ref<User[]>([
    {
      id: 'user-1',
      fullName: 'Anna Andersson',
      email: 'anna.andersson@example.se',
      phone: '+46701234567',
      role: 'administrator',
      notificationPreference: 'both',
    },
    {
      id: 'user-2',
      fullName: 'Erik Eriksson',
      email: 'erik.eriksson@example.se',
      phone: '+46702345678',
      role: 'board_member',
      notificationPreference: 'email',
    },
    {
      id: 'user-3',
      fullName: 'Maria Svensson',
      email: 'maria.svensson@example.se',
      phone: '+46703456789',
      role: 'board_member',
      notificationPreference: 'sms',
    },
  ]);

  const meetings = ref<Meeting[]>([
    {
      id: 'meeting-1',
      associationId: 'assoc-1',
      title: 'Styrelsemöte februari 2025',
      type: 'board_meeting',
      date: new Date('2025-02-15T18:00:00'),
      location: 'Föreningslokalen, Storvreta',
      description: 'Ordinarie styrelsemöte för februari',
      attendees: ['user-1', 'user-2', 'user-3'],
      status: 'scheduled',
      createdBy: 'user-1',
    },
    {
      id: 'meeting-2',
      associationId: 'assoc-1',
      title: 'Styrelsemöte januari 2025',
      type: 'board_meeting',
      date: new Date('2025-01-28T18:00:00'),
      location: 'Online (Zoom)',
      description: 'Digitalt styrelsemöte',
      attendees: ['user-1', 'user-2'],
      status: 'scheduled',
      createdBy: 'user-1',
    },
  ]);

  const documents = ref<Document[]>([
    {
      id: 'doc-1',
      associationId: 'assoc-1',
      meetingId: 'meeting-2',
      documentType: 'agenda',
      title: 'Dagordning - Styrelsemöte 28 januari',
      content: {},
      version: 1,
      status: 'finalized',
    },
    {
      id: 'doc-2',
      associationId: 'assoc-1',
      meetingId: 'meeting-1',
      documentType: 'agenda',
      title: 'Dagordning - Styrelsemöte 15 februari',
      content: {},
      version: 1,
      status: 'draft',
    },
  ]);

  const budgetItems = ref<BudgetItem[]>([
    {
      id: 'budget-1',
      associationId: 'assoc-1',
      category: 'Administrativa kostnader',
      description: 'Kontorsmaterial och trycksaker',
      amount: 5000,
      budgetYear: 2025,
      activityId: undefined,
    },
    {
      id: 'budget-2',
      associationId: 'assoc-1',
      category: 'Aktiviteter',
      description: 'Sommargrillfest för medlemmar',
      amount: 15000,
      budgetYear: 2025,
      activityId: 'activity-1',
    },
    {
      id: 'budget-3',
      associationId: 'assoc-1',
      category: 'Lokaler',
      description: 'Städning och underhåll',
      amount: 8000,
      budgetYear: 2025,
      activityId: undefined,
    },
    {
      id: 'budget-4',
      associationId: 'assoc-1',
      category: 'Aktiviteter',
      description: 'Städdag i området',
      amount: 3000,
      budgetYear: 2025,
      activityId: 'activity-2',
    },
  ]);

  const activities = ref<Activity[]>([
    {
      id: 'activity-1',
      associationId: 'assoc-1',
      title: 'Sommargrillfest',
      description: 'Gemensam grillning för alla medlemmar',
      activityDate: new Date('2025-06-21T17:00:00'),
      location: 'Parkområdet, Storvreta',
      status: 'planned',
    },
    {
      id: 'activity-2',
      associationId: 'assoc-1',
      title: 'Städdag i området',
      description: 'Gemensam städinsats',
      activityDate: new Date('2025-04-15T10:00:00'),
      location: 'Möts vid lekplatsen',
      status: 'planned',
    },
  ]);

  const premises = ref<Premises[]>([
    {
      id: 'premises-1',
      associationId: 'assoc-1',
      name: 'Föreningslokalen',
      address: 'Storvreta Centrum 15, Uppsala',
      spaceType: 'Möteslokal',
      intendedUse: 'Styrelsemöten, medlemsmöten, studiecirklar',
      rules: 'Städa efter dig. Max 20 personer. Ingen alkohol.',
      capacity: 20,
      isPublic: true,
    },
    {
      id: 'premises-2',
      associationId: 'assoc-1',
      name: 'Verkstadslokalen',
      address: 'Storvreta Centrum 17, Uppsala',
      spaceType: 'Verkstad',
      intendedUse: 'Hobbyverksamhet, reparationer',
      rules: 'Använd skyddsutrustning. Städa verktyg.',
      capacity: 8,
      isPublic: true,
    },
  ]);

  const bookings = ref<Booking[]>([
    {
      id: 'booking-1',
      premisesId: 'premises-1',
      requesterName: 'Kalle Karlsson',
      requesterEmail: 'kalle.karlsson@example.se',
      requesterPhone: '+46705555555',
      bookingDate: new Date('2026-01-25'),
      startTime: '18:00',
      endTime: '21:00',
      purpose: 'Studiecirkel om hyresrätt',
      status: 'approved',
    },
    {
      id: 'booking-2',
      premisesId: 'premises-1',
      requesterName: 'Lisa Andersson',
      requesterEmail: 'lisa.andersson@example.se',
      requesterPhone: '+46706666666',
      bookingDate: new Date('2026-01-28'),
      startTime: '15:00',
      endTime: '18:00',
      purpose: 'Bokcirkel',
      status: 'pending',
    },
    {
      id: 'booking-3',
      premisesId: 'premises-1',
      requesterName: 'Erik Svensson',
      requesterEmail: 'erik.svensson@example.se',
      requesterPhone: '+46707777777',
      bookingDate: new Date('2026-01-30'),
      startTime: '17:00',
      endTime: '20:00',
      purpose: 'Styrelsemöte',
      status: 'approved',
    },
    {
      id: 'booking-4',
      premisesId: 'premises-2',
      requesterName: 'Anna Bergström',
      requesterEmail: 'anna.bergstrom@example.se',
      requesterPhone: '+46708888888',
      bookingDate: new Date('2026-01-27'),
      startTime: '14:00',
      endTime: '17:00',
      purpose: 'Möbelreparation',
      status: 'approved',
    },
  ]);

  interface RecentActivity {
    id: string;
    type: string;
    user: string;
    action: string;
    timestamp: Date;
  }

  const recentActivities = ref<RecentActivity[]>([
    {
      id: 'activity-feed-1',
      type: 'document_created',
      user: 'Erik Eriksson',
      action: 'skapade en dagordning',
      timestamp: new Date('2025-01-20T14:30:00'),
    },
    {
      id: 'activity-feed-2',
      type: 'booking_request',
      user: 'Maria Svensson',
      action: 'skickade en bokningsförfrågan',
      timestamp: new Date('2025-01-19T10:15:00'),
    },
    {
      id: 'activity-feed-3',
      type: 'meeting_scheduled',
      user: 'Anna Andersson',
      action: 'schemalade ett möte för 2025-02-15',
      timestamp: new Date('2025-01-18T09:00:00'),
    },
  ]);

  const documentTemplates: Record<string, DocumentTemplate> = {
    agenda: {
      documentType: 'agenda',
      sections: [
        { id: 'section-1', title: '§1 Mötets öppnande', type: 'text', required: true, order: 1, placeholder: 'Ordförande förklarar mötet öppnat...' },
        { id: 'section-2', title: '§2 Närvaroregistrering', type: 'attendance', required: true, order: 2 },
        { id: 'section-3', title: '§3 Val av mötesordförande', type: 'text', required: true, order: 3, placeholder: 'Till mötesordförande valdes...' },
        { id: 'section-4', title: '§4 Val av sekreterare', type: 'text', required: true, order: 4, placeholder: 'Till sekreterare valdes...' },
        { id: 'section-5', title: '§5 Godkännande av dagordning', type: 'text', required: true, order: 5, placeholder: 'Dagordningen godkändes...' },
        { id: 'section-6', title: '§6 Föregående mötesprotokoll', type: 'text', required: false, order: 6, placeholder: 'Protokoll från föregående möte...' },
        { id: 'section-7', title: '§7 Ekonomisk rapport', type: 'text', required: false, order: 7, placeholder: 'Ekonomisk rapport presenterades...' },
        { id: 'section-8', title: '§8 Övriga frågor', type: 'list', required: false, order: 8 },
        { id: 'section-9', title: '§9 Nästa möte', type: 'text', required: false, order: 9, placeholder: 'Nästa möte planeras till...' },
        { id: 'section-10', title: '§10 Mötets avslutande', type: 'text', required: true, order: 10, placeholder: 'Mötet avslutades kl...' },
      ],
    },
    minutes: {
      documentType: 'minutes',
      sections: [
        { id: 'section-1', title: '§1 Mötets öppnande', type: 'text', required: true, order: 1, placeholder: 'Ordförande förklarade mötet öppnat kl...' },
        { id: 'section-2', title: '§2 Närvarande', type: 'attendance', required: true, order: 2 },
        { id: 'section-3', title: '§3 Mötesordförande', type: 'text', required: true, order: 3, placeholder: 'Till mötesordförande valdes...' },
        { id: 'section-4', title: '§4 Sekreterare', type: 'text', required: true, order: 4, placeholder: 'Till sekreterare valdes...' },
        { id: 'section-5', title: '§5 Justerare', type: 'text', required: true, order: 5, placeholder: 'Till justerare valdes...' },
        { id: 'section-6', title: '§6 Dagordning', type: 'text', required: true, order: 6, placeholder: 'Dagordningen godkändes...' },
        { id: 'section-7', title: '§7 Föregående protokoll', type: 'text', required: false, order: 7 },
        { id: 'section-8', title: '§8 Ekonomisk rapport', type: 'text', required: false, order: 8 },
        { id: 'section-9', title: '§9 Beslut och diskussioner', type: 'list', required: true, order: 9 },
        { id: 'section-10', title: '§10 Nästa möte', type: 'text', required: false, order: 10 },
        { id: 'section-11', title: '§11 Mötets avslutande', type: 'text', required: true, order: 11, placeholder: 'Mötet avslutades kl...' },
      ],
    },
    annual_report: {
      documentType: 'annual_report',
      sections: [
        { id: 'section-1', title: 'Verksamhetsberättelse', type: 'text', required: true, order: 1, placeholder: 'Sammanfattning av årets verksamhet...' },
        { id: 'section-2', title: 'Ekonomisk översikt', type: 'table', required: true, order: 2 },
        { id: 'section-3', title: 'Genomförda aktiviteter', type: 'list', required: true, order: 3 },
        { id: 'section-4', title: 'Styrelsesammansättning', type: 'attendance', required: true, order: 4 },
        { id: 'section-5', title: 'Framtidsplaner', type: 'text', required: false, order: 5, placeholder: 'Planer för kommande år...' },
      ],
    },
  };

  function getDocumentTemplate(type: 'agenda' | 'minutes' | 'annual_minutes' | 'annual_report'): DocumentTemplate {
    return documentTemplates[type] || documentTemplates.agenda;
  }

  function mockLogin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          isAuthenticated.value = true;
          resolve({ success: true });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  function mockLogout() {
    isAuthenticated.value = false;
  }

  function mockRegisterAssociation(_data: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Föreningen har registrerats. Väntar på verifiering.' 
        });
      }, 1500);
    });
  }

  function mockForgotPassword(_email: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Instruktioner för återställning av lösenord har skickats till din e-post.' 
        });
      }, 1000);
    });
  }

  function addBoardMember(member: User) {
    boardMembers.value.push(member);
  }

  function removeBoardMember(memberId: string) {
    const index = boardMembers.value.findIndex(m => m.id === memberId);
    if (index > -1) {
      boardMembers.value.splice(index, 1);
    }
  }

  function updateUser(userData: Partial<User>) {
    Object.assign(currentUser.value, userData);
  }

  function updateAssociation(associationData: Partial<Association>) {
    Object.assign(currentAssociation.value, associationData);
  }

  function createMeeting(meetingData: {
    type: 'board_meeting' | 'annual_meeting' | 'extraordinary_meeting';
    title: string;
    date: Date;
    location: string;
    description?: string;
    attendees: string[];
  }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMeeting: Meeting = {
          id: `meeting-${Date.now()}`,
          associationId: currentAssociation.value.id,
          title: meetingData.title,
          type: meetingData.type,
          date: meetingData.date,
          location: meetingData.location,
          description: meetingData.description,
          attendees: meetingData.attendees,
          status: 'scheduled',
          createdBy: currentUser.value.id,
        };
        meetings.value.push(newMeeting);
        resolve({ success: true, meeting: newMeeting });
      }, 500);
    });
  }

  function removeMeeting(meetingId: string) {
    const index = meetings.value.findIndex(m => m.id === meetingId);
    if (index > -1) {
      meetings.value.splice(index, 1);
    }
  }

  function updateMeeting(meetingId: string, updates: Partial<Meeting>) {
    const meeting = meetings.value.find(m => m.id === meetingId);
    if (meeting) {
      Object.assign(meeting, updates);
    }
  }

  return {
    isAuthenticated,
    currentUser,
    currentAssociation,
    boardMembers,
    meetings,
    documents,
    budgetItems,
    activities,
    premises,
    bookings,
    recentActivities,
    mockLogin,
    mockLogout,
    mockRegisterAssociation,
    mockForgotPassword,
    addBoardMember,
    removeBoardMember,
    updateUser,
    updateAssociation,
    createMeeting,
    removeMeeting,
    updateMeeting,
    getDocumentTemplate,
  };
});
