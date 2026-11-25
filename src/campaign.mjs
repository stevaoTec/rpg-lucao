export const GOAL=170;
export const MILESTONES=[0,35,70,105,140,170];
export function campaign(players,goal=GOAL){
if(!Number.isSafeInteger(goal)||goal<1)throw Error('Meta inválida');
const ranking=players.map(p=>{if(!Number.isSafeInteger(p.sales)||p.sales<0)throw Error('Vendas inválidas');return {...p,level:1+p.sales}}).sort((a,b)=>b.sales-a.sales);
const total=ranking.reduce((n,p)=>n+p.sales,0);
return {total,remaining:Math.max(0,goal-total),progress:Math.min(1,total/goal),ranking,unlocked:MILESTONES.filter(n=>total>=n),next:MILESTONES.find(n=>total<n)??null};
}
export function recordSale(players,id,delta){
if(!Number.isSafeInteger(delta)||delta===0||!players.some(p=>p.id===id))throw Error('Operação inválida');
return players.map(p=>{if(p.id!==id)return p;const sales=p.sales+delta;if(!Number.isSafeInteger(sales)||sales<0)throw Error('Saldo inválido');return {...p,sales}});
}