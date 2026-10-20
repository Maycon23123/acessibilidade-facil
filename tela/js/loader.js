// Carrega um fragmento HTML da pasta Components dentro de um elemento.
export async function loadComponent(slotId, path) {
  const slot = document.getElementById(slotId);
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Não foi possível carregar ${path}`);
  slot.innerHTML = await response.text();
}
