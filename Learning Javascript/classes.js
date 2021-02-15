 {
     class Animals {
         constructor(type, legs) {
             this.type = type;
             this.legs = legs;
         }

         makenoise() {
             console.log("make ")
         }

         get metadata() { return `Type:${this.type}, legs:${this.legs}` }
     }



     let cat = new Animals("cat", 4);
     cat.makenoise();
     console.log(cat.metadata);

 }