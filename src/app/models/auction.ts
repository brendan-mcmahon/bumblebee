export class Auction {
  id: number;
  code: string;
  name: string;
  status: string;
  currentAuctionItemId: number;
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
