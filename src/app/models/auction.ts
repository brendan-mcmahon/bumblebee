export class Auction {
  id: number;
  name: string;
  open: boolean;
  items: Item[];
  bidders: Bidder[];
}

export class Item {
  id: number;
  name: string;
  startingBid: number;
  currentBid: number;
  currentBidderId: number;
}

export class Bidder {
  id: number;
  name: string;
  online: boolean = false;
}

export class Bid {
  amount: number;
  bidderId: number;
}
