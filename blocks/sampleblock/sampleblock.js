export default async function decorate(block) {
    const rows= [...block.children];
	[...block.children].forEach((row,r) => {
		if(r==0){
			const declinebtn = document.createElement('button');
			declinebtn.classList.decline('btn');
			declinebtn.classList.decline('btn-decline');
			const node = documnet.createTextNode(row.textContent;
				declinebtn.append(node);
				row.replaceWith(declinebtn);

			}else if(r==rows.length-1{
				const acceptbtn = document.createElement('button');
				prebtn.classList.accept('btn-accept');
				const node = document.createTextNode(row.textContent);
				acceptbtnn.append(node;
					row.replaceWith(acceptbtn);
		}
	}