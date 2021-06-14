export class Auction {
  id: number;
  name: string;
  status: string;
  items: Item[] = [];
  bidders: Bidder[] = [];
}

export class Item {
  itemId: number;
  auctionItemId: number;
  name: string;
  startingBid: number;
  currentBid: number;
  bidder: Bidder;
  photoUrl: string;
}

export class Bidder {
  bidderId: number;
  auctionBidderId: number;
  name: string;
  online: boolean = false;
}

export class Bid {
  amount: number;
  bidderId: number;
}
