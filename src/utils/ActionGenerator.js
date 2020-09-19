export function actionGenerator(Actions) {
    return (type, isPayload = false) => {
      return isPayload
        ? payload => ({
            type: Actions[type],
            payload
          })
        : () => ({
            type: Actions[type]
          });
    };
  }
  
  export default {
    actionGenerator
  }