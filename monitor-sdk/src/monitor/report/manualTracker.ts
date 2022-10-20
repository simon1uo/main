import { lazyReport } from ".";

export default function tracker(actionType, data) {
  lazyReport('action', {
    actionType,
    data,
  })
};
