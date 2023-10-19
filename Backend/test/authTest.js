// Import necessary Firebase libraries and initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyDAda8jbpjwkdhDvo5KeaM7gj_ZE9DqTCI',
    authDomain: 'digital-memory-book.firebaseapp.com',
    projectId: 'digital-memory-book',
   };
   firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();
   // Function -- user login
   function loginUser(username, password) {
    const userData = {
      username: username,
      // Add other data if needed
    };
    // Store user data in Firebase
    db.collection('users')
      .doc(username)
      .set(userData)
      .then(() => {
        console.log('User data saved to Firebase.');
      })
      .catch((error) => {
        console.error('Error saving user data: ', error);
      });
   }
   // Test Case
   const testUsername = 'testuser';
   const testPassword = 'testpassword';
   // Simulate a user login
   loginUser(testUsername, testPassword);