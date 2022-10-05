
import './App.css';
import { calculateWithBranchAndBoundAlgorithm } from './utils/branchAndBoundAlgorithm';
import zingchart from 'zingchart/es6';
import ZingChart from 'zingchart-react';

var data = [
	
	{id:'collegeboard', name:'LB: 266', parent:''},

	{id:'president', name:'J1\n 123', parent:'collegeboard'},
  {id:'president1', name:'\n\nJ2\nPresident1', parent:'collegeboard'},
  {id:'president2', name:'\n\nJ3\nPresident2', parent:'collegeboard'},
  {id:'president3', name:'\n\nJ4\nPresident3', parent:'collegeboard'},
  {id:'president4', name:'President4', parent:'president3'},

];

var cdata = {
	type : 'tree',
	plotarea : {
		margin : 20
	},
	options : {
		aspect : 'tree-down',
    orgChart : true,
		packingFactor : 1,
		link : {
      aspect: 'line',
			lineColor : '#000',
			lineWidth : 2,
		},
		node : {
      type: 'circle',
			borderColor : '#000',
			borderWidth : 2,
			hoverState : {
				visible : false
			},
			label : {
				color : '#000',
				fontSize : 30,
        spacing: 30
			}
		},
	},
	series : data
};


function App() {
  const jobs = [[3,8,10], [12,9,12], [8,6,13], [12,10,16]];
  const jobsBB = [[77,11,82], [34,92,8], [88,36,30], [1,98,9]];
  // calculateWithJohnsonsAlgorithm(jobs);
  calculateWithBranchAndBoundAlgorithm(jobsBB);
  return (
    <div className="App">
      <ZingChart data={cdata}/>
    </div>
  );
}

export default App;
