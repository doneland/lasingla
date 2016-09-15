
export function getEvents(req, res, next) {
  return res.json({
    events: [
      {
        _id: 'AKDOKD',
        ticker: 'AAPL',
        field: 'REVENUE',
        eventType: 'DATA_POINT',
        frequency: 'Q',
        value: 12335555,
        units: 'USD'
      },
      {
        _id: 'KDFJFJH',
        ticker: 'IBM',
        field: 'REVENUE',
        eventType: 'DATA_POINT',
        frequency: 'Q',
        value: 133456666,
        units: 'USD'
      }
    ]
  });
}
