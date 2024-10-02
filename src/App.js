import './App.css'; // Ensure this is the correct path to your CSS file

import React, { useState, useEffect } from 'react';

const App = () => {
  const [totalBill, setTotalBill] = useState('');
  const [totalUnits, setTotalUnits] = useState('');
  const [lastReading, setLastReading] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [motorBill, setMotorBill] = useState('300');
  const [perUnitPrice, setPerUnitPrice] = useState('');

  useEffect(() => {
    if (totalBill && totalUnits) {
      const calculatedPerUnitPrice = (parseFloat(totalBill) / parseFloat(totalUnits)).toFixed(2);
      setPerUnitPrice(calculatedPerUnitPrice);
    }
  }, [totalBill, totalUnits]);

  const calculateBill = () => {
    const total = parseFloat(totalBill) || 0;
    const units = parseFloat(totalUnits) || 0;
    const price = parseFloat(perUnitPrice) || 0;
    const last = parseFloat(lastReading) || 0;
    const current = parseFloat(currentReading) || 0;
    const motor = parseFloat(motorBill) || 0;

    const unitUse = current - last;
    const diffInReading = unitUse;
    const billSplit = (price * unitUse) + motor;
    const withoutmotor = (price * unitUse); // Correct calculation for without motor
    const ourBill = total - billSplit;

    return {
      unitUse: unitUse.toFixed(2),
      diffInReading: diffInReading.toFixed(2),
      billSplit: billSplit.toFixed(2),
      withoutmotor: withoutmotor.toFixed(2), // Add without motor to return
      ourBill: ourBill.toFixed(2),
      perUnitPrice: price.toFixed(2)
    };
  };

  const result = calculateBill();

  return (
    <div>
      <h2>Electricity Bill Calculator</h2>
      <div>
        <label htmlFor="totalBill">Total Bill (INR) (કુલ બિલ )</label>
        <input
          id="totalBill"
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
          placeholder="Enter total bill amount"
        />
      </div>
      <div>
        <label htmlFor="totalUnits">Total Units Used(કુલ યુનિટ વપરાસ)</label>
        <input
          id="totalUnits"
          type="number"
          value={totalUnits}
          onChange={(e) => setTotalUnits(e.target.value)}
          placeholder="Enter total units used"
        />
      </div>
      <div>
        <label htmlFor="perUnitPrice">Calculated Per Unit Price (પર યુનિટ ભાવ)</label>
        <input
          id="perUnitPrice"
          type="number"
          value={perUnitPrice}
          readOnly
          placeholder="Calculated per unit price"
        />
      </div>
      <div>
        <label htmlFor="lastReading">Sub-Meter Reading Last (છેલ્લું સબ-મિટર રીડિંગ )</label>
        <input
          id="lastReading"
          type="number"
          value={lastReading}
          onChange={(e) => setLastReading(e.target.value)}
          placeholder="Enter last sub-meter reading"
        />
      </div>
      <div>
        <label htmlFor="currentReading">Sub-Meter Reading Now (સબ-મિટર રીડિંગ હાલ )</label>
        <input
          id="currentReading"
          type="number"
          value={currentReading}
          onChange={(e) => setCurrentReading(e.target.value)}
          placeholder="Enter current sub-meter reading"
        />
      </div>
      <div>
        <label htmlFor="motorBill">Motor Bill (INR) (મોટર નું  બિલ )</label>
        <input
          id="motorBill"
          type="number"
          value={motorBill}
          onChange={(e) => setMotorBill(e.target.value)}
          placeholder="Enter motor bill amount"
        />
      </div>
      <div>
        <p><strong>Diff in Reading (યુનિટ ઉપર વાડા ના):</strong> {result.diffInReading}</p>
        <p><strong>Calculated Per Unit Price (પર યુનિટ ભાવ):</strong> {result.perUnitPrice}</p>
        <p><strong>Bill Split (ઉપર વાડા નું બિલ મોટર વગર):</strong> ₹{result.withoutmotor}</p>
        <p><strong>Bill Split (ઉપર વાડા નું બિલ):</strong> ₹{result.billSplit}</p>
        <p><strong>Our Bill (ધનજીભાઈ નું બિલ):</strong> ₹{result.ourBill}</p>
      </div>
    </div>
  );
};

export default App;
