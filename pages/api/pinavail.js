import pindata from '../../pincodes.json'
export default function handler(req, res) {
  res.status(200).json(pindata);
}
