
export function validateCNPJ(cnpj): boolean {
	let length, number, digits, pos, result, sum = 0;
	
	cnpj = cnpj.replace(/[^\d]+/g,'');
	
	if(cnpj == '') return false;
	
	if (cnpj.length != 14)
	return false;
	
	// Elimina CNPJs invalidos conhecidos
	if (cnpj == "00000000000000" || 
	cnpj == "11111111111111" || 
	cnpj == "22222222222222" || 
	cnpj == "33333333333333" || 
	cnpj == "44444444444444" || 
	cnpj == "55555555555555" || 
	cnpj == "66666666666666" || 
	cnpj == "77777777777777" || 
	cnpj == "88888888888888" || 
	cnpj == "99999999999999")
	return false;
	
	// Valida DVs
	length = cnpj.length - 2
	number = cnpj.substring(0,length);
	digits = cnpj.substring(length);
	
	pos = length - 7;
	for (let i = length; i >= 1; i--) {
		sum += number.charAt(length - i) * pos--;
		if (pos < 2)
		pos = 9;
	}
	result = sum % 11 < 2 ? 0 : 11 - sum % 11;
	if (result != digits.charAt(0))
	return false;
	
	length = length + 1;
	number = cnpj.substring(0,length);
	sum = 0;
	pos = length - 7;
	for (let i = length; i >= 1; i--) {
		sum += number.charAt(length - i) * pos--;
		if (pos < 2)
		pos = 9;
	}
	result = sum % 11 < 2 ? 0 : 11 - sum % 11;
	if (result != digits.charAt(1))
	return false;
	
	return true;
}