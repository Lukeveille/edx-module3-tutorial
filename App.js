function PostButton(props) {
  const style = {
    width: 24,
    height: 24,
    cursor: "pointer"
  }
  return <button style={style} onClick={() => props.handleClick()}>{props.label}</button>
}
function PostText(props) {
  const style = {
    border: "1px solid black",
    display: "inline-block",
    width: props.width,
  }
  return <div style={style}>{props.text}</div>
}
function Post(props) {
  const style = {
    display: "flex",
  }
  return <div dtyle={style}>
    <PostButton label="x" handleClick={props.removeItem} />
    <PostText text = {props.title} width = "200px"/>
    <PostButton label = "+" handleClick={props.incrementScore} />
    <PostText text = {props.score} width = "20px"/>
    <PostButton label = "-" handleClick={props.decrementScore} />
  </div>
}

function PostList(props) {
  return <ol>
    {
      props.postList.map((item, index) => 
        <Post key={index}
          title={item.title}
          score={item.score}
          incrementScore={() => props.updateScore(index, 1)}
          decrementScore={() => props.updateScore(index, -1)}
          removeItem={() => props.removeItem(index)}
        />
      )
    }
  </ol>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"",
      items : [],
    }
  }
  handleChange(e) {
    this.setState({value: e.target.value})
  }
  addItem() {
    let itemsCopy = this.state.items.slice(),
    truncatedString = this.state.value.substring(0,20)

    itemsCopy.push({"title": truncatedString, "score": 0})
    itemsCopy.sort((a,b) => {
      return b.score - a.score
    })

    this.setState({items: itemsCopy, value: ""})
  }
  updateScore(index, val) {
    let itemsCopy = this.state.items.slice()
    itemsCopy[index].score += val
    itemsCopy.sort((a,b) => {
      return b.score - a.score
    })
    this.setState({items: itemsCopy})
  }
  removeItem(index) {
    let itemsCopy = this.state.items.slice()
    itemsCopy.splice(index, 1)
    itemsCopy.sort((a, b) => {
      return b.score -a.score
    })
    this.setState({items: itemsCopy})
  }
  render() {
    return <div>
      <input value={this.state.value} onChange={this.handleChange.bind(this)} />
      <button onClick={() => this.addItem()}>Submit</button>
      <PostList postList = {this.state.items}
        updateScore={this.updateScore.bind(this)}
        removeItem = {this.removeItem.bind(this)}
      />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));