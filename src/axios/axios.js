// Post a request for a user with a given ID
// render() {
//     return (
//       <div>
//         <Get url="/api/user" params={{id: "12345"}}>
//           {(error, response, isLoading, makeRequest, axios) => {
//             if(error) {
//               return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
//             }
//             else if(isLoading) {
//               return (<div>Loading...</div>)
//             }
//             else if(response !== null) {
//               return (<div>{response.data.message} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
//             }
//             return (<div>Default message before request is made.</div>)
//           }}
//         </Get>
//       </div>
//     )
//   }
