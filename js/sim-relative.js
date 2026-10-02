export function drawRelativeMotionSim(ctx, canvasWidth, vA, vB, dir, simTime) {
  const scale = 3;
  let posA = (vA * simTime * scale) % (canvasWidth - 60);
  let posB = (dir === 'same') 
    ? (vB * simTime * scale) % (canvasWidth - 60)
    : (canvasWidth - 60) - ((vB * simTime * scale) % (canvasWidth - 60));

  const dist = Math.abs(posA - posB) / scale;

  // Lanes
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 120); ctx.lineTo(canvasWidth - 30, 120);
  ctx.moveTo(30, 220); ctx.lineTo(canvasWidth - 30, 220);
  ctx.stroke();

  // Object A
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.roundRect(30 + posA, 95, 45, 22, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('Obj A', 38 + posA, 110);

  // Object B
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.roundRect(30 + posB, 195, 45, 22, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Obj B', 38 + posB, 210);

  return { dist };
}