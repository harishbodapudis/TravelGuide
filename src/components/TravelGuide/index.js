import Loader from 'react-loader-spinner'
import {useState, useEffect} from 'react'
import './index.css'

const TravelGuide = () => {
  const [fetchedData, setFetchedData] = useState(null)
  const [cleanUpValue, setCleanUpValue] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const url = 'https://apis.ccbp.in/tg/packages'
      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        const paraseData = data.packages.map(item => ({
          description: item.description,
          id: item.id,
          imageUrl: item.image_url,
          name: item.name,
        }))
        setFetchedData(paraseData)
        setCleanUpValue(1)
      }
    }

    getData()
    console.log(fetchedData)
  }, [cleanUpValue])

  const eachItem = item => (
    <li key={item.id} className="card-container">
      <div className="card">
        <img src={item.imageUrl} alt={item.name} className="img-item" />
        <div className="card-data">
          <h1 className="heading">{item.name}</h1>
          <p className="description">{item.description}</p>
        </div>
      </div>
    </li>
  )

  return (
    <div className="main-container">
      <div className="heading-container">
        <h1 className="main-heading">Travel Guide</h1>
        <div>
          <ul className="items-container">
            {fetchedData ? (
              fetchedData.map(item => eachItem(item))
            ) : (
              <div data-testid="loader" className="page-container">
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TravelGuide
