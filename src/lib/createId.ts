let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
  id++;
  //自增的时候每次都存下最大 id
  window.localStorage.setItem('_idMax', id.toString());
  return id;
}

export default createId;