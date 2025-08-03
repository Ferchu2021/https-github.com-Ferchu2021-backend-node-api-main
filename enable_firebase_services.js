console.log('🔥 Habilitando Servicios de Firebase\n');

console.log('📋 Estado actual:');
console.log('   ✅ Credenciales configuradas correctamente');
console.log('   ✅ Firebase Admin SDK funcionando');
console.log('   ❌ Firebase Authentication no habilitado');
console.log('   ❌ Firestore Database no habilitado');
console.log('');

console.log('🔧 Pasos para habilitar Firebase Authentication:\n');

console.log('1️⃣ Ve a Firebase Console:');
console.log('   https://console.firebase.google.com/');
console.log('');

console.log('2️⃣ Selecciona tu proyecto:');
console.log('   mcga-87b96');
console.log('');

console.log('3️⃣ Habilita Authentication:');
console.log('   - Ve a "Authentication" en el menú lateral');
console.log('   - Haz clic en "Get started" o "Comenzar"');
console.log('   - En "Sign-in method", busca "Email/Password"');
console.log('   - Haz clic en "Email/Password"');
console.log('   - Habilita el toggle "Enable"');
console.log('   - Haz clic en "Save"');
console.log('');

console.log('4️⃣ Habilita Firestore Database:');
console.log('   - Ve a "Firestore Database" en el menú lateral');
console.log('   - Haz clic en "Create database"');
console.log('   - Selecciona "Start in test mode" (para desarrollo)');
console.log('   - Elige una ubicación (puede ser la más cercana)');
console.log('   - Haz clic en "Done"');
console.log('');

console.log('5️⃣ Verifica las reglas de Firestore:');
console.log('   - En Firestore Database, ve a la pestaña "Rules"');
console.log('   - Las reglas deben permitir lectura/escritura para desarrollo');
console.log('   - Ejemplo de reglas para desarrollo:');
console.log('     rules_version = "2";');
console.log('     service cloud.firestore {');
console.log('       match /databases/{database}/documents {');
console.log('         match /{document=**} {');
console.log('           allow read, write: if true;');
console.log('         }');
console.log('       }');
console.log('     }');
console.log('');

console.log('6️⃣ Una vez completado, ejecuta:');
console.log('   node test_complete_firebase.js');
console.log('');

console.log('🎯 Resultado esperado:');
console.log('   ✅ Firebase Authentication funcionando');
console.log('   ✅ Firestore Database funcionando');
console.log('   ✅ Todos los endpoints de Firebase funcionando');
console.log('');

console.log('📚 Enlaces útiles:');
console.log('   - Firebase Console: https://console.firebase.google.com/');
console.log('   - Tu proyecto: https://console.firebase.google.com/project/mcga-87b96');
console.log('   - Authentication: https://console.firebase.google.com/project/mcga-87b96/authentication');
console.log('   - Firestore: https://console.firebase.google.com/project/mcga-87b96/firestore');
console.log('');

console.log('🚀 ¿Listo para habilitar los servicios?');
console.log('   Sigue los pasos anteriores y luego ejecuta la prueba.'); 