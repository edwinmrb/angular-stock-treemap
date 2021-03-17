import {Component, HostListener, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreemapComponent implements OnInit {

  private chartWidth;
  private chartHeight;
  private chart;
  private treemap;
  private headerHeight = 28;

  private toolTipDiv;

  private headerColor = '#262931';
  private linesParentsColor = '#3e424f';
  private linesChildrenColor = '#262931';
  private linesParentsHoverColor = '#FFE13E';
  private linesChildrenHoverColor = '#ffffff';


  private colors = ['#31cc5a', '#309e4f', '#35774e', '#414554', '#8b444f', '#bf4046', '#f63538'];
  private values = [500, 1000, 5000, 10000, 15000, 2000,];

  private root;
  private node;
  private data = {
    name: 'flare',
    children: [
      {
        name: 'analytics',
        children: [
          {
            name: 'cluster',
            children: [
              {name: 'AgglomerativeCluster', size: 3938},
              {name: 'CommunityStructure', size: 3812},
              {name: 'HierarchicalCluster', size: 6714},
              {name: 'MergeEdge', size: 743}
            ]
          },
          {
            name: 'graph',
            children: [
              {name: 'BetweennessCentrality', size: 3534},
              {name: 'LinkDistance', size: 5731},
              {name: 'MaxFlowMinCut', size: 7840},
              {name: 'ShortestPaths', size: 5914},
              {name: 'SpanningTree', size: 3416}
            ]
          },
          {
            name: 'optimization',
            children: [
              {name: 'AspectRatioBanker', size: 7074}
            ]
          }
        ]
      },
      {
        name: 'animate',
        children: [
          {name: 'Easing', size: 17010},
          {name: 'FunctionSequence', size: 5842},
          {
            name: 'interpolate',
            children: [
              {name: 'ArrayInterpolator', size: 1983},
              {name: 'ColorInterpolator', size: 2047},
              {name: 'DateInterpolator', size: 1375},
              {name: 'Interpolator', size: 8746},
              {name: 'MatrixInterpolator', size: 2202},
              {name: 'NumberInterpolator', size: 1382},
              {name: 'ObjectInterpolator', size: 1629},
              {name: 'PointInterpolator', size: 1675},
              {name: 'RectangleInterpolator', size: 2042}
            ]
          },
          {name: 'ISchedulable', size: 1041},
          {name: 'Parallel', size: 5176},
          {name: 'Pause', size: 449},
          {name: 'Scheduler', size: 5593},
          {name: 'Sequence', size: 5534},
          {name: 'Transition', size: 9201},
          {name: 'Transitioner', size: 19975},
          {name: 'TransitionEvent', size: 1116},
          {name: 'Tween', size: 6006}
        ]
      },
      {
        name: 'data',
        children: [
          {
            name: 'converters',
            children: [
              {name: 'Converters', size: 721},
              {name: 'DelimitedTextConverter', size: 4294},
              {name: 'GraphMLConverter', size: 9800},
              {name: 'IDataConverter', size: 1314},
              {name: 'JSONConverter', size: 2220}
            ]
          },
          {name: 'DataField', size: 1759},
          {name: 'DataSchema', size: 2165},
          {name: 'DataSet', size: 586},
          {name: 'DataSource', size: 3331},
          {name: 'DataTable', size: 772},
          {name: 'DataUtil', size: 3322}
        ]
      },
      {
        name: 'display',
        children: [
          {name: 'DirtySprite', size: 8833},
          {name: 'LineSprite', size: 1732},
          {name: 'RectSprite', size: 3623},
          {name: 'TextSprite', size: 10066}
        ]
      },
      {
        name: 'flex',
        children: [
          {name: 'FlareVis', size: 4116}
        ]
      },
      {
        name: 'physics',
        children: [
          {name: 'DragForce', size: 1082},
          {name: 'GravityForce', size: 1336},
          {name: 'IForce', size: 319},
          {name: 'NBodyForce', size: 10498},
          {name: 'Particle', size: 2822},
          {name: 'Simulation', size: 9983},
          {name: 'Spring', size: 2213},
          {name: 'SpringForce', size: 1681}
        ]
      },
      {
        name: 'query',
        children: [
          {name: 'AggregateExpression', size: 1616},
          {name: 'And', size: 1027},
          {name: 'Arithmetic', size: 3891},
          {name: 'Average', size: 891},
          {name: 'BinaryExpression', size: 2893},
          {name: 'Comparison', size: 5103},
          {name: 'CompositeExpression', size: 3677},
          {name: 'Count', size: 781},
          {name: 'DateUtil', size: 4141},
          {name: 'Distinct', size: 933},
          {name: 'Expression', size: 5130},
          {name: 'ExpressionIterator', size: 3617},
          {name: 'Fn', size: 3240},
          {name: 'If', size: 2732},
          {name: 'IsA', size: 2039},
          {name: 'Literal', size: 1214},
          {name: 'Match', size: 3748},
          {name: 'Maximum', size: 843},
          {
            name: 'methods',
            children: [
              {name: 'add', size: 593},
              {name: 'and', size: 330},
              {name: 'average', size: 287},
              {name: 'count', size: 277},
              {name: 'distinct', size: 292},
              {name: 'div', size: 595},
              {name: 'eq', size: 594},
              {name: 'fn', size: 460},
              {name: 'gt', size: 603},
              {name: 'gte', size: 625},
              {name: 'iff', size: 748},
              {name: 'isa', size: 461},
              {name: 'lt', size: 597},
              {name: 'lte', size: 619},
              {name: 'max', size: 283},
              {name: 'min', size: 283},
              {name: 'mod', size: 591},
              {name: 'mul', size: 603},
              {name: 'neq', size: 599},
              {name: 'not', size: 386},
              {name: 'or', size: 323},
              {name: 'orderby', size: 307},
              {name: 'range', size: 772},
              {name: 'select', size: 296},
              {name: 'stddev', size: 363},
              {name: 'sub', size: 600},
              {name: 'sum', size: 280},
              {name: 'update', size: 307},
              {name: 'variance', size: 335},
              {name: 'where', size: 299},
              {name: 'xor', size: 354},
              {name: '_', size: 264}
            ]
          },
          {name: 'Minimum', size: 843},
          {name: 'Not', size: 1554},
          {name: 'Or', size: 970},
          {name: 'Query', size: 13896},
          {name: 'Range', size: 1594},
          {name: 'StringUtil', size: 4130},
          {name: 'Sum', size: 791},
          {name: 'Variable', size: 1124},
          {name: 'Variance', size: 1876},
          {name: 'Xor', size: 1101}
        ]
      },
      {
        name: 'scale',
        children: [
          {name: 'IScaleMap', size: 2105},
          {name: 'LinearScale', size: 1316},
          {name: 'LogScale', size: 3151},
          {name: 'OrdinalScale', size: 3770},
          {name: 'QuantileScale', size: 2435},
          {name: 'QuantitativeScale', size: 4839},
          {name: 'RootScale', size: 1756},
          {name: 'Scale', size: 4268},
          {name: 'ScaleType', size: 1821},
          {name: 'TimeScale', size: 5833}
        ]
      },
      {
        name: 'util',
        children: [
          {name: 'Arrays', size: 8258},
          {name: 'Colors', size: 10001},
          {name: 'Dates', size: 8217},
          {name: 'Displays', size: 12555},
          {name: 'Filter', size: 2324},
          {name: 'Geometry', size: 10993},
          {
            name: 'heap',
            children: [
              {name: 'FibonacciHeap', size: 9354},
              {name: 'HeapNode', size: 1233}
            ]
          },
          {name: 'IEvaluable', size: 335},
          {name: 'IPredicate', size: 383},
          {name: 'IValueProxy', size: 874},
          {
            name: 'math',
            children: [
              {name: 'DenseMatrix', size: 3165},
              {name: 'IMatrix', size: 2815},
              {name: 'SparseMatrix', size: 3366}
            ]
          },
          {name: 'Maths', size: 17705},
          {name: 'Orientation', size: 1486},
          {
            name: 'palette',
            children: [
              {name: 'ColorPalette', size: 6367},
              {name: 'Palette', size: 1229},
              {name: 'ShapePalette', size: 2059},
              {name: 'SizePalette', size: 2291}
            ]
          },
          {name: 'Property', size: 5559},
          {name: 'Shapes', size: 19118},
          {name: 'Sort', size: 6887},
          {name: 'Stats', size: 6557},
          {name: 'Strings', size: 22026}
        ]
      },
      {
        name: 'vis',
        children: [
          {
            name: 'axis',
            children: [
              {name: 'Axes', size: 1302},
              {name: 'Axis', size: 24593},
              {name: 'AxisGridLine', size: 652},
              {name: 'AxisLabel', size: 636},
              {name: 'CartesianAxes', size: 6703}
            ]
          },
          {
            name: 'controls',
            children: [
              {name: 'AnchorControl', size: 2138},
              {name: 'ClickControl', size: 3824},
              {name: 'Control', size: 1353},
              {name: 'ControlList', size: 4665},
              {name: 'DragControl', size: 2649},
              {name: 'ExpandControl', size: 2832},
              {name: 'HoverControl', size: 4896},
              {name: 'IControl', size: 763},
              {name: 'PanZoomControl', size: 5222},
              {name: 'SelectionControl', size: 7862},
              {name: 'TooltipControl', size: 8435}
            ]
          },
          {
            name: 'data',
            children: [
              {name: 'Data', size: 20544},
              {name: 'DataList', size: 19788},
              {name: 'DataSprite', size: 10349},
              {name: 'EdgeSprite', size: 3301},
              {name: 'NodeSprite', size: 19382},
              {
                name: 'render',
                children: [
                  {name: 'ArrowType', size: 698},
                  {name: 'EdgeRenderer', size: 5569},
                  {name: 'IRenderer', size: 353},
                  {name: 'ShapeRenderer', size: 2247}
                ]
              },
              {name: 'ScaleBinding', size: 11275},
              {name: 'Tree', size: 7147},
              {name: 'TreeBuilder', size: 9930}
            ]
          },
          {
            name: 'events',
            children: [
              {name: 'DataEvent', size: 2313},
              {name: 'SelectionEvent', size: 1880},
              {name: 'TooltipEvent', size: 1701},
              {name: 'VisualizationEvent', size: 1117}
            ]
          },
          {
            name: 'legend',
            children: [
              {name: 'Legend', size: 20859},
              {name: 'LegendItem', size: 4614},
              {name: 'LegendRange', size: 10530}
            ]
          },
          {
            name: 'operator',
            children: [
              {
                name: 'distortion',
                children: [
                  {name: 'BifocalDistortion', size: 4461},
                  {name: 'Distortion', size: 6314},
                  {name: 'FisheyeDistortion', size: 3444}
                ]
              },
              {
                name: 'encoder',
                children: [
                  {name: 'ColorEncoder', size: 3179},
                  {name: 'Encoder', size: 4060},
                  {name: 'PropertyEncoder', size: 4138},
                  {name: 'ShapeEncoder', size: 1690},
                  {name: 'SizeEncoder', size: 1830}
                ]
              },
              {
                name: 'filter',
                children: [
                  {name: 'FisheyeTreeFilter', size: 5219},
                  {name: 'GraphDistanceFilter', size: 3165},
                  {name: 'VisibilityFilter', size: 3509}
                ]
              },
              {name: 'IOperator', size: 1286},
              {
                name: 'label',
                children: [
                  {name: 'Labeler', size: 9956},
                  {name: 'RadialLabeler', size: 3899},
                  {name: 'StackedAreaLabeler', size: 3202}
                ]
              },
              {
                name: 'layout',
                children: [
                  {name: 'AxisLayout', size: 6725},
                  {name: 'BundledEdgeRouter', size: 3727},
                  {name: 'CircleLayout', size: 9317},
                  {name: 'CirclePackingLayout', size: 12003},
                  {name: 'DendrogramLayout', size: 4853},
                  {name: 'ForceDirectedLayout', size: 8411},
                  {name: 'IcicleTreeLayout', size: 4864},
                  {name: 'IndentedTreeLayout', size: 3174},
                  {name: 'Layout', size: 7881},
                  {name: 'NodeLinkTreeLayout', size: 12870},
                  {name: 'PieLayout', size: 2728},
                  {name: 'RadialTreeLayout', size: 12348},
                  {name: 'RandomLayout', size: 870},
                  {name: 'StackedAreaLayout', size: 9121},
                  {name: 'TreeMapLayout', size: 9191}
                ]
              },
              {name: 'Operator', size: 2490},
              {name: 'OperatorList', size: 5248},
              {name: 'OperatorSequence', size: 4190},
              {name: 'OperatorSwitch', size: 2581},
              {name: 'SortOperator', size: 2023}
            ]
          },
          {name: 'Visualization', size: 16540}
        ]
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
    this.chartWidth = window.innerWidth - 20;
    this.chartHeight = window.innerHeight / 1.3;
    this.createSvg();
    this.drawLegend();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    /* this.chartWidth = window.innerWidth;
     this.chartHeight = window.innerHeight;
     this.xscale = d3.scaleLinear().range([0, this.chartWidth]);
     this.yscale = d3.scaleLinear().range([0, this.chartHeight]);*/
  }

  createSvg(): void {
    const This = this;

    // Define the div for the tooltip
    this.toolTipDiv = d3.select('#my_dataviz').append('div')
      .attr('class', 'tooltip').style('visibility', 'hidden');


    this.treemap = d3.treemap().size([this.chartWidth, this.chartHeight])
      .paddingTop(this.headerHeight)
      .paddingBottom(4)
      .paddingLeft(4)
      .paddingRight(4);


    const zoom2 = d3.zoom()
      .scaleExtent([1, 6])
      .translateExtent([[0, 0], [this.chartWidth, this.chartHeight]])
      .on('zoom', (e) => {
        This.chart.attr('transform', e.transform);
      });

    this.chart = d3.select('#my_dataviz')
      .append('svg:svg')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight)
      .call(zoom2)
      .append('svg:g');


    d3.json('https://gist.githubusercontent.com/mbostock/1093025/raw/b40b9fc5b53b40836ead8aa4b4a17d948b491126/flare.json').then(data => {

      this.node = this.root = data;

      // @ts-ignore
      const root = d3.hierarchy(data, (d) => d.children).sum((d) => d.size);
      const nodes = this.treemap(root);


      const children = nodes.descendants().filter((d) => {
        return !d.children;
      });

      const parents = nodes.descendants().filter((d) => {
          return d.children;
        }
      );

      // create parent cells
      const parentCells = this.chart.selectAll('g.cell.parent')
        .data(parents, (d) => {
          // @ts-ignore
          return 'p-' + d.data.name;
        });

      const parentEnterTransition = parentCells.enter()
        .append('g')
        .attr('class', 'cell parent')
        .attr('filter', '')
        .style('stroke', this.linesParentsColor)
        .attr('transform', (d) => {
          return 'translate(' + d.x0 + ',' + d.y0 + ')';
        })
        .on('mouseover', function(d, i) {
          d3.select(this).select('rect')
            .style('fill', This.linesParentsHoverColor);
        })
        .on('mouseout', function(d: any) {

          d3.select(this).select('rect')
            .style('fill', This.headerColor);
        })
        .on('click', (d) => {
          zoom(d);
        });

      parentEnterTransition.append('rect')
        .attr('width', (d) => {
          return Math.max(0.01, d.x1 - d.x0);
        })
        .attr('height', (d) => {
          return d.y1 - d.y0;
        })
        .style('fill', this.headerColor);

      parentEnterTransition.append('foreignObject')
        .attr('class', 'foreignObject')
        .attr('width', (d) => {
          return Math.max(0.01, d.x1 - d.x0);
        })
        .attr('height', (d) => {
          return d.y1 - d.y0;
        })
        .append('xhtml:body')
        .attr('class', 'labelbody')
        .append('div')
        .attr('class', 'label')
        .text((d) => {
          // @ts-ignore
          return d.data.name;
        });


      // create children cells
      const childrenCells = this.chart.selectAll('g.cell.child')
        .data(children, (d) => {
          // @ts-ignore
          return 'c-' + d.data.name;
        });


      // enter transition
      const childEnterTransition = childrenCells.enter()
        .append('g')
        .attr('class', 'cell child')
        .attr('filter', '')
        .style('stroke', this.linesChildrenColor)
        .on('mouseover', function(d, i) {

          This.toolTipDiv.transition().duration(200).style('visibility', 'visible');

          const headerTag = '<li><strong>PARENT:' + i.parent.data.name + '</strong></li>';
          const bodyTag = '<li class="li-body" style="background:' + This.fillColorConverter(i.data.size) + '">Name: ' + i.data.name + '<br/>' + 'Value: ' + i.data.size + '</li>';
          const list = '<ul class="tooltip-ul">' + headerTag + bodyTag + '</ul>';

          This.toolTipDiv.html(list)
            .style('left', (d.pageX < (This.chartWidth / 2) ? d.pageX + 50 : (d.pageX - 150)) + 'px')
            .style('top', (d.pageY < (This.chartHeight / 2) ? d.pageY + 20 : (d.pageY - 100)) + 'px');

          this.parentNode.appendChild(this); // workaround for bringing elements to the front (ie z-index)
          d3.select(this)
            .attr('filter', '')
            .style('stroke', This.linesChildrenHoverColor);
        })
        .on('mouseout', function(d: any) {

          This.toolTipDiv.transition()
            .duration(500).style('visibility', 'hidden');

          d3.select(this)
            .attr('filter', '')
            .style('stroke', This.linesChildrenColor);
        })
        .attr('transform', (d) => {
          return 'translate(' + d.x0 + ',' + d.y0 + ')';
        })
        .on('click', (d) => {
          zoom(this.node === d.parent ? root : d.parent);
        });


      childEnterTransition.append('rect')
        .classed('background', true)
        // @ts-ignore
        .style('fill', (d) => {
          return This.fillColorConverter(d.value);
        })
        .attr('width', (d) => {
          return Math.max(0.01, d.x1 - d.x0);
        })
        .attr('height', (d) => {
          return Math.max(0.01, d.y1 - d.y0);
        });

      childEnterTransition.append('foreignObject')
        .attr('class', 'foreignObject')
        .attr('width', (d) => {
          return Math.max(0.01, d.x1 - d.x0);
        })
        .attr('height', (d) => {
          return Math.max(0.01, d.y1 - d.y0);
        })
        .append('xhtml:body')
        .attr('class', 'labelbody')
        .append('div')
        .attr('class', 'label')
        .text((d) => {
          // @ts-ignore
          return d.data.name;
        });

      // zoom(this.root);

    });

    function zoom(d): void {
      console.log(d);
    }
  }


  drawLegend(): void {

    const legW = 80;

    const legend = d3.select('#legend')
      .append('svg:svg')
      .attr('width', this.chartWidth)
      .attr('height', 150)
      .append('svg:g');


    legend.selectAll('rect')
      .data(this.colors)
      .enter()
      .append('rect')
      .attr('width', legW)
      .attr('transform', (d, i) => {
        return 'translate(' + i * legW + ',' + 10 + ')';
      })
      .attr('height', 20)
      // @ts-ignore
      .style('fill', function(d) {
        return d;
      });

    legend.selectAll('text')
      .data(this.values)
      .enter()
      .append('text')
      .attr('x', (d, i) => {
        return ((i + 1) * legW) - 10;
      })
      .attr('y', 50)
      .text((d, i) => {
        console.log(d);
        return d;
      })
      .style('fill', 'black')
      .style('stroke', 'none');
  }

  fillColorConverter(value: number): string {

    /*  TODO IMPLEMENT COLOR CUSTOM RULES*/
    /*   private colors = ['#31cc5a', '#309e4f', '#35774e', '#414554', '#8b444f', '#bf4046', '#f63538'];
       private values = [1000, 5000,  10000, 15000, 2000, 30000];*/
    if (value < 500) {
      return '#31cc5a';
    } else if (value < 1000) {
      return '#309e4f';
    } else if (value < 5000) {
      return '#35774e';
    } else if (value < 10000) {
      return '#414554';
    } else if (value < 15000) {
      return '#8b444f';
    } else if (value < 20000) {
      return '#bf4046';
    } else {
      return '#f63538';
    }
  }

}
