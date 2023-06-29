
export default {
  message(html){
    M.toast({html:`${html} ✔️`})
  },
  error(html){
    M.toast({html: `Ошибка: ${html} ❌`})
  }
};
