# Testing Guide - Chart.js & Board Member Management

## 🎯 Testing Chart.js Budget Visualization

### Prerequisites
- Navigate to: http://localhost:5173/dashboard
- Ensure you're logged in as Administrator (default mock user)

### Expected Behavior
1. **Location**: Budget chart appears in the right column under "Budget översikt 2025"
2. **Chart Type**: Doughnut chart
3. **Data Displayed**:
   - Administrativa kostnader: 5,000 SEK (Dark teal)
   - Aktiviteter: 15,000 SEK (Medium teal)
   - Lokaler: 30,000 SEK (Light teal)
4. **Total Budget**: 50,000 SEK displayed below chart
5. **Legend**: Shows at bottom of chart

### Troubleshooting Chart Issues

#### If chart is not showing:
1. **Check browser console** (F12) for errors
2. **Verify canvas element exists**: Right-click → Inspect → Look for `<canvas ref="budgetChartCanvas">`
3. **Check if Chart.js loaded**: In console, type `Chart` - should show Chart.js object

#### Common Issues:
- **Blank canvas**: Chart.js may not be registered properly
- **No data**: Budget items array may be empty
- **Canvas not found**: Ref binding issue

---

## 👥 Testing Board Member Management

### Prerequisites
- Navigate to: http://localhost:5173/settings
- Ensure you're logged in as Administrator

### Test 1: View Board Members
**Expected Results:**
- Should see 3 existing members:
  1. Anna Andersson (Administratör)
  2. Erik Eriksson (Styrelsemedlem)
  3. Maria Svensson (Styrelsemedlem)
- Each member shows: Avatar, Name, Email, Phone, Role badge
- Anna Andersson should NOT have a delete button (can't delete yourself)
- Erik and Maria should have red trash icon buttons

### Test 2: Add New Board Member
**Steps:**
1. Click "Lägg till medlem" button (top right of board members section)
2. Modal should open with title "Lägg till styrelsemedlem"
3. Fill in form:
   - **Fullständigt namn**: "Test Testsson"
   - **E-post**: "test@example.se"
   - **Telefon**: "+46701111111"
   - **Roll**: Select "Styrelsemedlem"
   - **Notifieringsinställning**: Select "E-post"
4. Click "Lägg till" button

**Expected Results:**
- Modal closes
- Success message appears: "Ny medlem har lagts till"
- New member appears in the list (4 total members)
- New member shows all entered information

**If NOT working:**
- Check browser console for errors
- Verify modal opens (BaseModal component issue)
- Check if form validation is blocking submission
- Verify store's `addBoardMember` function is called

### Test 3: Remove Board Member
**Steps:**
1. Find Erik Eriksson or Maria Svensson in the list
2. Click the red trash icon button
3. Confirm deletion in browser alert

**Expected Results:**
- Confirmation dialog appears: "Är du säker på att du vill ta bort denna medlem?"
- After confirming, member is removed from list
- Success message: "Medlemmen har tagits bort"
- List updates to show remaining members

**If NOT working:**
- Check if `handleRemoveMember` function is being called
- Verify store's `removeBoardMember` function exists
- Check if member.id is being passed correctly

---

## 🔍 Debugging Steps

### For Chart.js Issues:

1. **Open browser console** (F12)
2. **Check for errors** related to Chart.js
3. **Verify Chart.js is loaded**:
   ```javascript
   console.log(Chart.version); // Should show version number
   ```
4. **Check if canvas ref is bound**:
   ```javascript
   // In Vue DevTools, check DashboardView component
   // budgetChartCanvas should be a canvas element
   ```
5. **Verify budget data exists**:
   ```javascript
   // In Vue DevTools, check mockDataStore
   // budgetItems should have 3 items
   ```

### For Board Member Management Issues:

1. **Open browser console** (F12)
2. **Check for errors** when clicking buttons
3. **Verify modal component**:
   - Modal should be visible in DOM when button clicked
   - Check if `showAddMemberModal` is true
4. **Test store functions** in console:
   ```javascript
   // Get store instance
   const store = useMockDataStore();
   
   // Check current members
   console.log(store.boardMembers);
   
   // Test add function
   store.addBoardMember({
     id: 'test-123',
     fullName: 'Test User',
     email: 'test@test.se',
     phone: '+46700000000',
     role: 'board_member',
     notificationPreference: 'email'
   });
   
   // Test remove function
   store.removeBoardMember('user-2');
   ```

---

## 📊 Expected Console Output

### Successful Chart Rendering:
- No errors
- Chart.js initialization message (if debug mode)

### Successful Member Addition:
- No errors
- Store should log member addition (if debug mode)

### Successful Member Removal:
- Browser confirmation dialog
- No errors after confirmation

---

## 🐛 Known Issues & Fixes

### Issue: Chart not rendering
**Possible Causes:**
1. Chart.js not imported correctly
2. Canvas ref not bound
3. Budget items array empty
4. Chart created before canvas mounted

**Fix:** Check `onMounted` hook in DashboardView.vue

### Issue: Modal not opening
**Possible Causes:**
1. BaseModal component issue
2. v-model binding not working
3. showAddMemberModal not reactive

**Fix:** Verify BaseModal component and v-model binding

### Issue: Members not updating after add/remove
**Possible Causes:**
1. Store not reactive
2. storeToRefs not used correctly
3. boardMembers not a ref

**Fix:** Ensure using `storeToRefs` for reactive store values

---

## ✅ Success Criteria

### Chart.js Visualization:
- [ ] Doughnut chart visible on dashboard
- [ ] Shows 3 budget categories with correct amounts
- [ ] Total budget displays correctly (50,000 SEK)
- [ ] Legend shows at bottom
- [ ] Chart is responsive

### Board Member Management:
- [ ] Can view all 3 existing members
- [ ] "Lägg till medlem" button opens modal
- [ ] Can fill and submit add member form
- [ ] New member appears in list immediately
- [ ] Success message shows after adding
- [ ] Can delete members (except current user)
- [ ] Confirmation dialog appears before deletion
- [ ] Member removed from list after confirmation
- [ ] Success message shows after deletion

---

## 📝 Reporting Issues

If you encounter issues, please provide:
1. **Browser console errors** (screenshot or copy/paste)
2. **Steps to reproduce** the issue
3. **Expected vs actual behavior**
4. **Browser and version** (Chrome, Firefox, etc.)
5. **Screenshot** of the issue (if visual)
