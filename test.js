class ControlledMultiple extends React.Component{

  constructor(props){
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = {inputName:"", textAreaName: ""}
  }
  handleChange(event){
      this.setState({[event.target.name]: event.target.value})
  }
  render(){
      return (
          <div>

              <input name="inputName" type = "input" value = {this.state.inputName} onChange = {this.handleChange}/>
              <textarea name="textAreaName" type = "text" value = {this.state.textAreaName} onChange = {this.handleChange}/>
          </div>
      )
  }
}
ReactDOM.render(
<ControlledMultiple/>,
document.getElementById('root')
)