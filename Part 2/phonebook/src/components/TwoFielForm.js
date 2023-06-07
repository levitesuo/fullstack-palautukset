const TwoFieldForm = ({formHeading, f1Text, f1Value, f1OnChange, f2Text, f2Value, f2OnChange, buttonText, onSubmit}) => (
    <div>
      <h2>{formHeading}</h2>
      <form onSubmit={onSubmit}>
            <div>
            {f1Text} <input 
                value={f1Value}
                onChange={f1OnChange}
              />
            </div>
            <div>
            {f2Text} <input 
                value={f2Value}
                onChange={f2OnChange}
              />
            </div>
            <div><button type="submit">{buttonText}</button></div>
          </form>
    </div>
  )
export default TwoFieldForm