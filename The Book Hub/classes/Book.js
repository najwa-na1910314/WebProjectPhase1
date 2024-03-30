export class book {
    constructor(
      id,
      title,
      isbn,
  
      status,
      categories,
      thumbnailUrl,
      quantity,
      price
    ) {
      this.id = id;
      this.title = title;
      this.isbn = isbn;
  
      this.status = status;
      this.categories = categories;
  
      this.thumbnailUrl = thumbnailUrl;
      this.quantity = quantity;
      this.price = price;
    }
  }
  