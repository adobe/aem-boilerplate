/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as C,h as g}from"./fetch-graphql.js";import{h as w}from"./fetch-error.js";const D=`
  mutation ADD_PURCHASE_ORDER_COMMENT(
    $purchaseOrderUid: ID!
    $comment: String!
  ) {
    addPurchaseOrderComment(
      input: { purchase_order_uid: $purchaseOrderUid, comment: $comment }
    ) {
      comment {
        created_at
        text
        uid
        author {
          allow_remote_shopping_assistance
          confirmation_status
          created_at
          date_of_birth
          email
          firstname
          gender
          job_title
          lastname
          middlename
          prefix
          status
          structure_id
          suffix
          telephone
        }
      }
    }
  }
`,b=r=>{var s,h,a,i,u,d,l,t,_,f,e,p,O,x,E;return{createdAt:(r==null?void 0:r.created_at)??"",text:(r==null?void 0:r.text)??"",uid:(r==null?void 0:r.uid)??"",author:{allowRemoteShoppingAssistance:((s=r==null?void 0:r.author)==null?void 0:s.allow_remote_shopping_assistance)??!1,confirmationStatus:((h=r==null?void 0:r.author)==null?void 0:h.confirmation_status)??"",createdAt:((a=r==null?void 0:r.author)==null?void 0:a.created_at)??"",dateOfBirth:((i=r==null?void 0:r.author)==null?void 0:i.date_of_birth)??"",email:((u=r==null?void 0:r.author)==null?void 0:u.email)??"",firstname:((d=r==null?void 0:r.author)==null?void 0:d.firstname)??"",gender:((l=r==null?void 0:r.author)==null?void 0:l.gender)??0,jobTitle:((t=r==null?void 0:r.author)==null?void 0:t.job_title)??"",lastname:((_=r==null?void 0:r.author)==null?void 0:_.lastname)??"",middlename:((f=r==null?void 0:r.author)==null?void 0:f.middlename)??"",prefix:((e=r==null?void 0:r.author)==null?void 0:e.prefix)??"",status:((p=r==null?void 0:r.author)==null?void 0:p.status)??"",structureId:((O=r==null?void 0:r.author)==null?void 0:O.structure_id)??"",suffix:((x=r==null?void 0:r.author)==null?void 0:x.suffix)??"",telephone:((E=r==null?void 0:r.author)==null?void 0:E.telephone)??""}}},R=async(r,s)=>{if(!r)throw new Error("Purchase Order ID is required");if(!s)throw new Error("Comment text is required");return C(D,{variables:{purchaseOrderUid:r,comment:s}}).then(a=>{var i,u,d;return(i=a.errors)!=null&&i.length&&w(a.errors),b((d=(u=a.data)==null?void 0:u.addPurchaseOrderComment)==null?void 0:d.comment)}).catch(g)};export{R as a};
//# sourceMappingURL=addPurchaseOrderComment.js.map
