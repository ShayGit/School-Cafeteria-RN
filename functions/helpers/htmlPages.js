const checkoutHtmlPage = (bluesnapData) => {
  return ` <html>
      <body>
        <script type="text/javascript" src="https://sandbox.bluesnap.com/web-sdk/4/bluesnap.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <h1>מעביר לתשלום בטוח...</h1>
        <div id="error-message"></div>
        <div id="warning-message"></div>
        <script>
        const success = ()=>
        {
          const Http = new XMLHttpRequest();
          const url=${JSON.stringify(bluesnapData.success_url)};
          Http.open("GET", url, true);
          Http.onreadystatechange = function() {
            if (Http.readyState == 4 && Http.status == 200) {
              window.location = url;
            }
            else
            {
              window.ReactNativeWebView.postMessage(Http.readyState);
              window.ReactNativeWebView.postMessage(Http.status);
            }
          };
          Http.send();
        }
        
        const fail = () => 
        {
          const Http = new XMLHttpRequest();
          const url=${JSON.stringify(bluesnapData.cancel_url)};
          Http.open("GET", url, true);
          Http.onreadystatechange = function() {
            if (Http.readyState == 4 && Http.status == 200) {
              window.location = url;
            }
            else
            {
              

            }
          };
          Http.send();
        }
        
        (window.onload = function () {
          
        const jsonData = {
          token: ${JSON.stringify(bluesnapData.jsonData.token)},
          title: "תשלום עבור הזמנה",
          description: "תשלום באשראי באופן בטוח",
          amount: ${JSON.stringify(bluesnapData.jsonData.amount)},
          currency: "ILS",
          buttonLabel: "לחץ לתשלום",
          billingDetails: false,
          includeEmail: true,
          language: "EN",
          shopperData: {
            email: ${JSON.stringify(bluesnapData.jsonData.shopperData.email)},
            firstname: ${JSON.stringify(
              bluesnapData.jsonData.shopperData.firstname
            )},
            lastname: ${JSON.stringify(
              bluesnapData.jsonData.shopperData.lastname
            )},
          },
        };
                bluesnap.embeddedCheckoutSetup(jsonData ,  (eCheckoutResult) =>{
                  if (eCheckoutResult.code == 1) { 

                    const options = {
                      headers: { 
                        Authorization: ${JSON.stringify(bluesnapData.idToken)}
                       }
                    }

                      const body ={
                        data: {
                          cardTransactionType: "AUTH_CAPTURE",
                          amount: ${JSON.stringify(
                            bluesnapData.jsonData.amount
                          )}, 
                          currency: "ILS", 
                          pfToken: ${JSON.stringify(
                            bluesnapData.jsonData.token
                          )}
                          },
                          orderId: ${JSON.stringify(bluesnapData.orderId)}
                      }

                        axios.post(${JSON.stringify(
                          bluesnapData.pay_url
                        )},body,options).then(res => {
                           if(res.data.success)
                        {
                          
                    window.ReactNativeWebView.postMessage("payment ok");
                          success();
                      }
                      else{
                        
                    window.ReactNativeWebView.postMessage("payment not ok");
                        fail();
                      }
                      })
                      .catch(error => fail());
                      
                  }
                  else { 
                    var displayError = document.getElementById('error-message');
                    var displayWarning = document.getElementById('warning-message');
      
                    displayError = eCheckoutResult.status;
                          if(eCheckoutResult.info){
                               var errors = eCheckoutResult.info.errors; 
                               var warnings = eCheckoutResult.info.warnings; 
                               displayError.textContent = errors;
                               displayWarning.textContent = warnings;
                          }
                          fail();
                 }        
                  bluesnap.embeddedCheckoutClose();
                 
                });
                bluesnap.embeddedCheckoutOpen();
              })();
         </script>
      </body>
    </html>`;
};

const checkoutSuccessHtmlPage = () => {
  return `<html>
    <body>
      <h1>Payment Success</h1>
      <script>
        window.close();
      </script>
    </body>
  </html>`;
};

const checkoutCanceledHtmlPage = () => {
  return `<html>
    <body>
      <h1>Payment Canceled</h1>
      <script>
        window.close();
      </script>
    </body>
  </html>`;
};

module.exports = {
  checkoutHtmlPage,
  checkoutSuccessHtmlPage,
  checkoutCanceledHtmlPage,
};
