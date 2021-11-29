import { Schema, model } from "mongoose";

interface Place {
  id: string;
  lat: number;
  lon: number;
  name: string;
  approved: boolean;
  displayName: string;
}

interface Path {
  to: Place;
  from: Place;
  images: string[];
  busPrice: number;
  ladaPrice: number;
  approved: boolean;
  minBusPrice: number;
}

const PathSchema = new Schema<Path>(
  {
    to: {
      id: String,
      lat: Number,
      lon: Number,
      name: String,
      displayName: String,
    },
    from: {
      id: String,
      lat: Number,
      lon: Number,
      name: String,
      displayName: String,
    },
    images: Array,
    busPrice: Number,
    ladaPrice: Number,
    approved: Boolean,
    minBusPrice: Number,
  },
  {
    timestamps: true,
  }
);

PathSchema.index({
  "to.name": "text",
  "to.displayName": "text",
  "from.name": "text",
  "from.displayName": "text",
});

export default model("Path", PathSchema);
