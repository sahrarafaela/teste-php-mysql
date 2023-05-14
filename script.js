window.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('#search')
    const tableContainer = document.querySelector('#results tbody')
    const resultsContainer = document.querySelector('#resultsContainer')
    const errorsContainer = document.querySelector('.errors-container')

    let search_criteria = ''

    if(search){
        search.addEventListener('input',event =>{
            search_criteria = event.target.value.toUpperCase()

            showResults()
        })
    }
    const searchData = async () =>{
            let searchData = new FormData()
            searchData.append('search_criteria', search_criteria)

            try {
                const response = await fetch ('./php/search_data.php', {
                    method: 'POST',
                    body: searchData
                })

                return response.json()
            } catch (error) {
                alert(`${'Erro'} ${error.mensage}`)
                console.log(error)
            }
    }

    const showResults = () =>{
        searchData()
        .then(dataResults =>{
            console.log(dataResults)
            tableContainer.innerHTML = ''
            if(typeof dataResults.data !== 'undefined' && !dataResults.data){

                errorsContainer.style.display = 'block'
                errorsContainer.querySelector('p').innerHTML = `
                No hay resultados para el criterios de busca: <span class= "bold" >${search_criteria}</span>`
                resultsContainer.style.display = 'none'
            }else{
                resultsContainer.style.display = 'block'
                errorsContainer.style.display = 'none'
                for (const author of dataResults){
                    const row = document.createElement('tr')
                    row.innerHTML = `
                        <td>${author.id}</td>
                        <td>${author.firt_name.toUpperCase().replace(search_criteria,'<span class= "bold">$&</span>')}</td>
                        <td>${author.last_name.toUpperCase().replace(search_criteria,'<span class= "bold">$&</span>')}</td>
                        <td>${author.emails}</td>
                        <td>${author.birthdate}</td>
                    `
                    tableContainer.appendChild(row)
                }
                

            }
        })
    }
    showResults()
})