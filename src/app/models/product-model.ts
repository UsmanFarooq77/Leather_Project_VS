export class product {
    
post_category:string;
post_content:string;
actual_price:string;
post_tags:string;
post_title:string;
post_actual_price:string;
post_special_price:string;
post_discount:number;
post_sku:string;
image1:string;
image2:string;
image3:string;
image4:string;
image5:string;
image6:string;
picker:string;
post_address:string;
post_cnic:string;
post_email:string;
post_phone_num:string;
post_status:boolean;
$key: string;
    constructor(values : Object = {}){
       Object.assign(this,values)
    }
}