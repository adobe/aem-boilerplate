const deleteNegotiableQuotes = (quoteUid) => {
    cy.getUserTokenCookie().then((token) => {
      if (token) {
        const querydeleteNegotiableQuotes = `mutation {
          deleteNegotiableQuotes(
            input: {
              quote_uids: ["${quoteUid}"]
            }
          ) {
            result_status,
            operation_results {
              ...on NegotiableQuoteUidOperationSuccess{
                __typename
                quote_uid
              }
              ...on DeleteNegotiableQuoteOperationFailure{
                __typename
                quote_uid
                errors {
                  __typename
                  ...on ErrorInterface{
                    message
                  }
                  ...on NoSuchEntityUidError{
                    uid
                    message
                  }
                  ...on NegotiableQuoteInvalidStateError {
                    message
                  }
                }
              }
            }
          }
        }`;
        cy.request({
          method: 'POST',
          url: Cypress.env('graphqlEndPoint'),
          auth: {
            bearer: token,
          },
          headers: {
            'content-type': 'application/json',
          },
          body: {
            query: JSON.parse(JSON.stringify(querydeleteNegotiableQuotes)),
          },
        }).then((response) => {
          expect(response).property('status').to.equal(200);
        });
      }
    });
  };
  
  Cypress.Commands.add('deleteNegotiableQuotes', deleteNegotiableQuotes);
  
  