import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User, Association, Meeting, Document, BudgetItem, Activity, Premises, Booking, Proposal, AssociationRequest, MembershipApplication } from '../types';

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
    address: 'Storvreta Centrum, Uppsala',
    registrationNumber: 'HGF-2024-001',
    verified: true,
  });

  // All associations with location data
  const associations = ref<Association[]>([
    {
      id: 'assoc-1',
      name: 'Storvreta Hyresgäster',
      address: 'Storvreta Centrum, Uppsala',
      postcode: '75226',
      city: 'Uppsala',
      area: 'Storvreta',
      latitude: 59.943,
      longitude: 17.732,
      description: 'Lokal hyresgästförening för Storvreta med fokus på trygg och trivsam boendemiljö',
      missionStatement: 'Vi arbetar för bättre boendemiljö i Storvreta genom aktivt medlemsengagemang, dialog med fastighetsägare och regelbundna aktiviteter som stärker gemenskapen i området.',
      customBookingInstructions: 'Nycklar hämtas på Storvreta bibliotek mellan kl 10:00-18:00. Återlämning senast kl 12:00 dagen efter. Ta med giltig legitimation och bokningsbekräftelse. Kontakta oss på 018-123 4567 vid frågor.',
      registrationNumber: 'HGF-2024-001',
      verified: true,
      contactEmail: 'info@storvreta-hg.se',
      contactPhone: '018-123 4567',
      memberCount: 1024,
    },
    {
      id: 'assoc-2',
      name: 'Gottsunda Hyresgäster',
      address: 'Gottsunda Centrum, Uppsala',
      postcode: '75646',
      city: 'Uppsala',
      area: 'Gottsunda',
      latitude: 59.831,
      longitude: 17.698,
      description: 'Hyresgästförening för Gottsunda med mål att förbättra boendemiljön och skapa gemenskap',
      missionStatement: 'Tillsammans skapar vi ett bättre Gottsunda där alla känner sig trygga och välkomna.',
      customBookingInstructions: 'Nyckel finns hos väktaren vid huvudentrén. Öppettider vardagar 08:00-20:00. Vid bokning på helg, kontakta oss minst 3 dagar i förväg.',
      registrationNumber: 'HGF-2024-002',
      verified: true,
      contactEmail: 'info@gottsunda-hg.se',
      contactPhone: '018-234 5678',
      memberCount: 856,
    },
    {
      id: 'assoc-3',
      name: 'Kungsängen Hyresgäster',
      address: 'Kungsängsvägen 10, Uppsala',
      postcode: '75323',
      city: 'Uppsala',
      area: 'Kungsängen',
      latitude: 59.858,
      longitude: 17.638,
      description: 'Vi arbetar för bättre boende i Kungsängen med fokus på gemenskap och trivsel',
      missionStatement: 'Kungsängens hyresgäster - för ett tryggare och trevligare boende.',
      customBookingInstructions: 'Nyckel hämtas hos vaktmästaren. Ring 018-345 6789 för tidsbokning.',
      registrationNumber: 'HGF-2024-003',
      verified: true,
      contactEmail: 'info@kungsangen-hg.se',
      contactPhone: '018-345 6789',
      memberCount: 654,
    },
    {
      id: 'assoc-4',
      name: 'Eriksberg Hyresgäster',
      address: 'Eriksberg, Uppsala',
      postcode: '75443',
      city: 'Uppsala',
      area: 'Eriksberg',
      latitude: 59.843,
      longitude: 17.623,
      description: 'Lokala hyresgäster som engagerar sig för området och dess invånare',
      missionStatement: 'Eriksberg - där alla är välkomna och alla bidrar till gemenskapen.',
      customBookingInstructions: 'Kontakta styrelsen för nyckelutlämning minst 2 dagar före bokning.',
      registrationNumber: 'HGF-2024-004',
      verified: true,
      contactEmail: 'info@eriksberg-hg.se',
      contactPhone: '018-456 7890',
      memberCount: 432,
    },
    {
      id: 'assoc-5',
      name: 'Stenhagen Hyresgäster',
      address: 'Stenhagen, Uppsala',
      postcode: '75651',
      city: 'Uppsala',
      area: 'Stenhagen',
      latitude: 59.872,
      longitude: 17.627,
      description: 'Hyresgästförening för Stenhagen med målet att skapa bättre boende för alla',
      missionStatement: 'Stenhagen - en plats att kalla hem, en gemenskap att vara del av.',
      customBookingInstructions: 'Nycklar finns tillgängliga hos expeditionen vardagar 09:00-17:00.',
      registrationNumber: 'HGF-2024-005',
      verified: true,
      contactEmail: 'info@stenhagen-hg.se',
      contactPhone: '018-567 8901',
      memberCount: 789,
    },
  ]);

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
    // Storvreta activities
    {
      id: 'act-1',
      associationId: 'assoc-1',
      title: '🌭 Sommargrillning 15 juni',
      description: 'Välkommen till vår årliga sommargrillning! Gratis för alla medlemmar. Vi bjuder på korv, sallad och läsk. Ta gärna med egna tillbehör. Mingel och trevlig samvaro.',
      activityDate: '2025-06-15T17:00:00',
      location: 'Parkområdet, Storvreta',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      category: 'event',
      isPublic: true,
      status: 'planned',
      createdAt: '2025-05-10T10:00:00',
    },
    {
      id: 'act-2',
      associationId: 'assoc-1',
      title: '🧹 Vårstädning 20 april - Alla hjälper till!',
      description: 'Dags för gemensam vårstädning! Vi träffas kl 10:00 vid huvudentrén. Ta med arbetshandskar och gärna egna redskap. Fika serveras kl 12:00.',
      activityDate: '2025-04-20T10:00:00',
      location: 'Möts vid lekplatsen',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      category: 'event',
      isPublic: true,
      status: 'planned',
      createdAt: '2025-03-25T14:00:00',
    },
    {
      id: 'act-3',
      associationId: 'assoc-1',
      title: '🎉 Nya lekplatsen är klar!',
      description: 'Vi är glada att meddela att renoveringen av lekplatsen nu är helt färdig. Nya gungor, rutschkana och klätterställning har installerats. Välkomna att testa!',
      activityDate: '2025-05-05T00:00:00',
      imageUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800',
      category: 'news',
      isPublic: true,
      status: 'completed',
      createdAt: '2025-05-05T12:00:00',
    },
    {
      id: 'act-4',
      associationId: 'assoc-1',
      title: 'Styrelsemöte 12 mars - INTERNT',
      description: 'Månatligt styrelsemöte. Dagordning skickas ut separat till styrelsemedlemmar.',
      activityDate: '2025-03-12T18:00:00',
      imageUrl: null,
      category: 'meeting',
      isPublic: false,
      status: 'completed',
      createdAt: '2025-03-01T10:00:00',
    },
    
    // Gottsunda activities
    {
      id: 'act-5',
      associationId: 'assoc-2',
      title: '🎄 Julmarknad 15 december',
      description: 'Traditionell julmarknad i Gottsunda! Försäljning av hantverk, hembakat, glögg och pepparkakor. Alla är välkomna! Barn får träffa tomten kl 14:00.',
      activityDate: '2025-12-15T12:00:00',
      imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
      category: 'event',
      isPublic: true,
      status: 'planned',
      createdAt: '2025-11-01T09:00:00',
    },
    {
      id: 'act-6',
      associationId: 'assoc-2',
      title: '🏃 Promenadgrupp startar igen',
      description: 'Vår promenadgrupp startar upp igen! Varje tisdag och torsdag kl 10:00 träffas vi vid Gottsunda centrum. Ca 5 km promenad i lugn takt.',
      activityDate: '2025-04-08T10:00:00',
      imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
      category: 'news',
      isPublic: true,
      status: 'ongoing',
      createdAt: '2025-04-01T08:00:00',
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
      customMessage: 'Nyckeln hämtas hos vaktmästaren på Storvreta Centrum 10, vardagar 08:00-16:00. Kom ihåg att städa och släcka ljuset när du går!',
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
      customMessage: 'Verktyg finns på plats. Använd skyddsutrustning! Kod till dörren: 1234. Lås alltid efter dig.',
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
      submittedAt: new Date('2026-01-20'),
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
      submittedAt: new Date('2026-01-26'),
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
      submittedAt: new Date('2026-01-22'),
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
      submittedAt: new Date('2026-01-23'),
    },
  ]);

  const proposals = ref<Proposal[]>([]);

  const associationRequests = ref<AssociationRequest[]>([]);

  const membershipApplications = ref<MembershipApplication[]>([]);

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

  // Helper function: Calculate distance between coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Search associations by postcode/city/area
  const searchAssociations = (query: string) => {
    const searchTerm = query.toLowerCase().trim();
    return associations.value.filter(assoc => 
      assoc.postcode?.includes(searchTerm) ||
      assoc.city?.toLowerCase().includes(searchTerm) ||
      assoc.area?.toLowerCase().includes(searchTerm) ||
      assoc.name.toLowerCase().includes(searchTerm)
    );
  };

  // Get nearby associations (sorted by distance)
  const getNearbyAssociations = (lat: number, lon: number, maxResults = 10) => {
    const withDistance = associations.value.map(assoc => ({
      ...assoc,
      distance: calculateDistance(lat, lon, assoc.latitude || 0, assoc.longitude || 0)
    }));
    
    return withDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxResults);
  };

  // Get association by ID
  const getAssociationById = (id: string) => {
    return associations.value.find(assoc => assoc.id === id);
  };

  // Get public activities by association
  const getPublicActivitiesByAssociation = (associationId: string) => {
    return activities.value
      .filter(act => act.associationId === associationId && act.isPublic)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // Submit proposal
  const submitProposal = (proposalData: Omit<Proposal, 'id' | 'status' | 'submittedAt'>) => {
    return new Promise<{ success: boolean; proposal: Proposal }>((resolve) => {
      setTimeout(() => {
        const newProposal: Proposal = {
          ...proposalData,
          id: `proposal-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        };
        proposals.value.push(newProposal);
        resolve({ success: true, proposal: newProposal });
      }, 500);
    });
  };

  // Submit association request
  const submitAssociationRequest = (requestData: Omit<AssociationRequest, 'id' | 'status' | 'submittedAt'>) => {
    return new Promise<{ success: boolean; request: AssociationRequest }>((resolve) => {
      setTimeout(() => {
        const newRequest: AssociationRequest = {
          ...requestData,
          id: `assoc-req-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        };
        associationRequests.value.push(newRequest);
        resolve({ success: true, request: newRequest });
      }, 500);
    });
  };

  // Submit membership application
  const submitMembershipApplication = (applicationData: Omit<MembershipApplication, 'id' | 'status' | 'submittedAt'>) => {
    return new Promise<{ success: boolean; application: MembershipApplication }>((resolve) => {
      setTimeout(() => {
        const newApplication: MembershipApplication = {
          ...applicationData,
          id: `member-app-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        };
        membershipApplications.value.push(newApplication);
        resolve({ success: true, application: newApplication });
      }, 500);
    });
  };

  // Get premises by association (for booking from association page - shows all premises)
  const getPremisesByAssociation = (associationId: string, publicOnly: boolean = false) => {
    if (publicOnly) {
      return premises.value.filter(p => p.associationId === associationId && p.isPublic);
    }
    return premises.value.filter(p => p.associationId === associationId);
  };

  // Get premises by ID
  const getPremisesById = (premisesId: string) => {
    return premises.value.find(p => p.id === premisesId);
  };

  // Submit booking
  const submitBooking = (bookingData: Omit<Booking, 'id' | 'status' | 'submittedAt' | 'customConfirmation'>) => {
    return new Promise<{ success: boolean; booking: Booking; customMessage?: string }>((resolve) => {
      setTimeout(() => {
        const premises = getPremisesById(bookingData.premisesId);
        const newBooking: Booking = {
          ...bookingData,
          id: `booking-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
          customConfirmation: premises?.customMessage,
        };
        bookings.value.push(newBooking);
        resolve({ 
          success: true, 
          booking: newBooking,
          customMessage: premises?.customMessage 
        });
      }, 500);
    });
  };

  // Approve booking
  const approveBooking = (bookingId: string, reviewerName: string) => {
    const booking = bookings.value.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'approved';
      booking.reviewedBy = reviewerName;
      booking.reviewedAt = new Date();
    }
  };

  // Reject booking
  const rejectBooking = (bookingId: string, reviewerName: string, reason: string) => {
    const booking = bookings.value.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'rejected';
      booking.reviewedBy = reviewerName;
      booking.reviewedAt = new Date();
      booking.rejectionReason = reason;
    }
  };

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
    associations,
    proposals,
    associationRequests,
    membershipApplications,
    recentActivities,
    getDocumentTemplate,
    mockLogin,
    mockLogout,
    searchAssociations,
    getNearbyAssociations,
    getAssociationById,
    getPublicActivitiesByAssociation,
    getPremisesByAssociation,
    getPremisesById,
    submitProposal,
    submitAssociationRequest,
    submitMembershipApplication,
    submitBooking,
    approveBooking,
    rejectBooking,
    mockRegisterAssociation,
    mockForgotPassword,
    addBoardMember,
    removeBoardMember,
    updateUser,
    updateAssociation,
    createMeeting,
    removeMeeting,
    updateMeeting,
  };
});
