import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Card from '../components/Card'

const results = [
    {
        title: 'Repo 1',
        description: 'This is the first card.',
    },
    {
        title: 'Repo 2',
        description: 'This is the second card.',
    },
    {
        title: 'Repo 3',
        description: 'This is the third card.',
    },
]

export default function SearchResults() {
    const [query, setQuery] = useState('')
    const [filteredResults, setFilteredResults] = useState(results)
    
    function handleSearch(query: string) {
        setQuery(query)
        setFilteredResults(
            results.filter((result) =>
            result.title.toLowerCase().includes(query.toLowerCase())
            )
            )
        }
        
    return (
        <div className="max-w-3xl mx-auto my-8 px-4">
            <SearchBar onChange={handleSearch} />
            <div className="mt-4">
            {filteredResults.map((result, index) => (
                <Card key={index} title={result.title} description={result.description} />
                ))}
                </div>
            </div>
    )
}