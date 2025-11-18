/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as R,h as z}from"./network-error.js";const G=c=>{var r,n,l,e,u,d,t,a,_,y,o,g,b,v,f,C,h,p,i,T,E,I,P,D;return{credit:{available_credit:{currency:((e=(l=(n=(r=c==null?void 0:c.data)==null?void 0:r.company)==null?void 0:n.credit)==null?void 0:l.available_credit)==null?void 0:e.currency)||"",value:((a=(t=(d=(u=c==null?void 0:c.data)==null?void 0:u.company)==null?void 0:d.credit)==null?void 0:t.available_credit)==null?void 0:a.value)||0},credit_limit:{currency:((g=(o=(y=(_=c==null?void 0:c.data)==null?void 0:_.company)==null?void 0:y.credit)==null?void 0:o.credit_limit)==null?void 0:g.currency)||"",value:((C=(f=(v=(b=c==null?void 0:c.data)==null?void 0:b.company)==null?void 0:v.credit)==null?void 0:f.credit_limit)==null?void 0:C.value)||0},outstanding_balance:{currency:((T=(i=(p=(h=c==null?void 0:c.data)==null?void 0:h.company)==null?void 0:p.credit)==null?void 0:i.outstanding_balance)==null?void 0:T.currency)||"",value:((D=(P=(I=(E=c==null?void 0:c.data)==null?void 0:E.company)==null?void 0:I.credit)==null?void 0:P.outstanding_balance)==null?void 0:D.value)||0}}}},N=c=>{var n,l,e,u,d,t;const r=(l=(n=c==null?void 0:c.data)==null?void 0:n.company)==null?void 0:l.credit_history;return{items:((e=r==null?void 0:r.items)==null?void 0:e.map(a=>{var _,y,o,g,b,v,f,C,h,p,i,T,E,I,P,D;return{amount:{currency:((_=a==null?void 0:a.amount)==null?void 0:_.currency)||"",value:((y=a==null?void 0:a.amount)==null?void 0:y.value)||0},balance:{availableCredit:{currency:((g=(o=a==null?void 0:a.balance)==null?void 0:o.available_credit)==null?void 0:g.currency)||"",value:((v=(b=a==null?void 0:a.balance)==null?void 0:b.available_credit)==null?void 0:v.value)||0},creditLimit:{currency:((C=(f=a==null?void 0:a.balance)==null?void 0:f.credit_limit)==null?void 0:C.currency)||"",value:((p=(h=a==null?void 0:a.balance)==null?void 0:h.credit_limit)==null?void 0:p.value)||0},outstandingBalance:{currency:((T=(i=a==null?void 0:a.balance)==null?void 0:i.outstanding_balance)==null?void 0:T.currency)||"",value:((I=(E=a==null?void 0:a.balance)==null?void 0:E.outstanding_balance)==null?void 0:I.value)||0}},customReferenceNumber:(a==null?void 0:a.custom_reference_number)||void 0,date:(a==null?void 0:a.date)||"",type:(a==null?void 0:a.type)||"",updatedBy:{name:((P=a==null?void 0:a.updated_by)==null?void 0:P.name)||"",type:((D=a==null?void 0:a.updated_by)==null?void 0:D.type)||""}}}))||[],pageInfo:{currentPage:((u=r==null?void 0:r.page_info)==null?void 0:u.current_page)||1,pageSize:((d=r==null?void 0:r.page_info)==null?void 0:d.page_size)||20,totalPages:((t=r==null?void 0:r.page_info)==null?void 0:t.total_pages)||0},totalCount:(r==null?void 0:r.total_count)||0}},S=`
  query GET_COMPANY_CREDIT 
    {
        company {
            credit {
                available_credit {
                    currency
                    value
                }
                credit_limit {
                    currency
                    value
                }
                outstanding_balance {
                    currency
                    value
                }
            }
        }
    }
`,$=async()=>await R(S,{method:"GET",cache:"no-cache"}).then(c=>{var n;return(n=c.errors)!=null&&n.length?null:G(c)}).catch(z),O=`
  query GET_COMPANY_CREDIT_HISTORY($filter: CompanyCreditHistoryFilterInput, $pageSize: Int, $currentPage: Int) {
    company {
      credit_history(
        filter: $filter
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          amount {
            currency
            value
          }
          balance {
            available_credit {
              currency
              value
            }
            credit_limit {
              currency
              value
            }
            outstanding_balance {
              currency
              value
            }
          }
          custom_reference_number
          date
          type
          updated_by {
            name
            type
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        total_count
      }
    }
  }
`,A=async(c={})=>{const{filter:r,pageSize:n=20,currentPage:l=1}=c,e=r?{custom_reference_number:r.customReferenceNumber,operation_type:r.operationType,updated_by:r.updatedBy}:null;return await R(O,{method:"GET",cache:"no-cache",variables:{filter:e,pageSize:n,currentPage:l}}).then(u=>{var t;return(t=u.errors)!=null&&t.length?null:N(u)}).catch(z)};export{$ as a,A as g};
//# sourceMappingURL=getCompanyCreditHistory.js.map
