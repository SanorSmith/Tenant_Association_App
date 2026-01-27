import { useMockDataStore } from '../stores/mockData';
import type { Meeting, Document, BudgetItem, Activity, Booking, Association } from '../types';

export interface ReportData {
  association: Association;
  period: {
    start: Date;
    end: Date;
  };
  meetings: Meeting[];
  documents: Document[];
  budgetItems: BudgetItem[];
  activities: Activity[];
  bookings: Booking[];
  summary: {
    totalMeetings: number;
    totalDocuments: number;
    totalBudget: number;
    totalActivities: number;
    totalBookings: number;
  };
}

export function generateReportData(startDate: Date, endDate: Date): ReportData {
  const mockDataStore = useMockDataStore();
  
  const meetings = mockDataStore.meetings.filter(m => 
    m.date >= startDate && m.date <= endDate
  );
  
  const documents = mockDataStore.documents.filter(d =>
    d.finalizedAt && d.finalizedAt >= startDate && d.finalizedAt <= endDate
  );
  
  const activities = mockDataStore.activities.filter(a =>
    a.activityDate >= startDate && a.activityDate <= endDate
  );
  
  const bookings = mockDataStore.bookings.filter(b =>
    b.bookingDate >= startDate && b.bookingDate <= endDate
  );
  
  const budgetItems = mockDataStore.budgetItems;
  
  return {
    association: mockDataStore.currentAssociation,
    period: { start: startDate, end: endDate },
    meetings,
    documents,
    budgetItems,
    activities,
    bookings,
    summary: {
      totalMeetings: meetings.length,
      totalDocuments: documents.length,
      totalBudget: budgetItems.reduce((sum, item) => sum + item.amount, 0),
      totalActivities: activities.length,
      totalBookings: bookings.length,
    },
  };
}

export async function generatePDFSummary(reportData: ReportData): Promise<Blob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pdfContent = `
SAMMANFATTANDE RAPPORT
${reportData.association.name}

Period: ${reportData.period.start.toLocaleDateString('sv-SE')} - ${reportData.period.end.toLocaleDateString('sv-SE')}

SAMMANFATTNING:
- Möten: ${reportData.summary.totalMeetings}
- Dokument: ${reportData.summary.totalDocuments}
- Budget: ${reportData.summary.totalBudget} SEK
- Aktiviteter: ${reportData.summary.totalActivities}
- Bokningar: ${reportData.summary.totalBookings}

MÖTEN:
${reportData.meetings.map(m => `- ${m.title} (${new Date(m.date).toLocaleDateString('sv-SE')})`).join('\n')}

DOKUMENT:
${reportData.documents.map(d => `- ${d.title} (${d.documentType})`).join('\n')}

AKTIVITETER:
${reportData.activities.map(a => `- ${a.title} (${new Date(a.activityDate).toLocaleDateString('sv-SE')})`).join('\n')}

BOKNINGAR:
${reportData.bookings.map(b => `- ${b.requesterName} (${new Date(b.bookingDate).toLocaleDateString('sv-SE')})`).join('\n')}

[Mock PDF Content - Will be replaced with real PDF in Stage 2]
      `;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      resolve(blob);
    }, 2000);
  });
}

export function downloadPDFSummary(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
