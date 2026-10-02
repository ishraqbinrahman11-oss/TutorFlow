export function drawInclinedPlaneSim(ctx, angle, mu, mass, simTime) {
  const rad = angle * Math.PI / 180;
  const g = 9.8;

  let acc = g * (Math.sin(rad) - mu * Math.cos(rad));
  if (acc < 0) acc = 0;

  const currentVel = acc * simTime;
  const dist = 0.5 * acc * simTime * simTime;

  const startX = 60;
  const startY = 260;
  const rampLength = 320;
  const endX = startX + rampLength * Math.cos(rad);
  const endY = startY - rampLength * Math.sin(rad);

  // Ramp
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineTo(endX, startY);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Block along ramp
  const pixelDist = Math.min(dist * 12, rampLength - 30);
  const blockX = endX - pixelDist * Math.cos(rad);
  const blockY = endY + pixelDist * Math.sin(rad);

  ctx.save();
  ctx.translate(blockX, blockY);
  ctx.rotate(-rad);
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(-15, -20, 30, 20);
  ctx.restore();

  return { acc, currentVel, dist };
}