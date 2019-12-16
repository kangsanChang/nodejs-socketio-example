const orderList = [];
const items = document.getElementsByClassName('collection-item');

document.addEventListener('DOMContentLoaded', function () {
    for(let i=0; i<items.length; i++) {
        let menuName = document.getElementById(items[i].id).children[1].innerText
        items[i].addEventListener('click',() => {
            if (items[i].classList.contains('active')){
                items[i].classList.remove('active');
                orderList.pop(orderList.indexOf(menuName));
            }else{
                items[i].classList.add('active');
                orderList.push(menuName);
            }
        })
    }
})

const submitOrder = () => {
    const order = {
        order: [...orderList], // for deep copy
        'requests': document.getElementById('requests').value
    }
    orderList.length = 0;
    return order;
}
