// const asyncHandeler = () => async (req, res , next) => {
//         try {

//         } catch (error) {
//             console.log(error);
//         }
// }

export const asyncHandeler = (requestHandeler) => async (req, res, next) => {
    Promise.resolve(requestHandeler(req, res, next)).catch((err) => { next => err })
}