import bcrypt from 'bcrypt';

const saltRounds = 8


export const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
}

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

export default {
  hashPassword,
  comparePassword
}

// TODO Wapper errors handler
// function wrapWithErrorHandler(targetClass) {
//   return new Proxy(targetClass, {
//     construct(target, args) {
//       const instance = new target(...args);

//       const handler = {
//         get(obj, prop) {
//           if (typeof obj[prop] === 'function') {
//             return async function (...args) {
//               try {
//                 return await obj[prop](...args);
//               } catch (error) {
//                 console.error(`Error in method ${prop}:`, error.message);
//                 throw error;  // Ném lỗi để xử lý ở tầng cao hơn nếu cần
//               }
//             };
//           }
//           return obj[prop];
//         }
//       };

//       return new Proxy(instance, handler);
//     }
//   });
// }

// Using
// const userRepository = new UserRepository();
// const WrappedAuthService = wrapWithErrorHandler(AuthService);
// const authService = new WrappedAuthService(userRepository);
