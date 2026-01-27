import { useMockDataStore } from '../stores/mockData';

export function useMockData() {
  const store = useMockDataStore();
  
  return {
    currentUser: store.currentUser,
    currentAssociation: store.currentAssociation,
    boardMembers: store.boardMembers,
    meetings: store.meetings,
    documents: store.documents,
    budgetItems: store.budgetItems,
    activities: store.activities,
    premises: store.premises,
    bookings: store.bookings,
  };
}
