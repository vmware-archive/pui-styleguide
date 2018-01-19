import React from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Collapse} from 'pivotal-ui/react/collapse';
import {Iconography, Icon} from 'pivotal-ui/react/iconography';
import {Input} from 'pivotal-ui/react/inputs';
import {Checkbox} from 'pivotal-ui/react/checkbox';
import {componentItems} from '../helpers/content';

const flattenJson = jsonObj => {
  if (jsonObj.type === 'code') return '';
  if (!jsonObj.children) return jsonObj.value;
  return jsonObj.children.map(flattenJson).join(' ');
};

const searchItems = componentItems.map(item => {
  return {name: item.name, value: item.name, href: item.href, content: flattenJson(item.json)};
});

const SearchResult = ({mainText, secondaryText, searchText, matchIndex}) => <div>
  <div><b><u>{mainText.substr(matchIndex, searchText.length)}</u>{mainText.substr(searchText.length)}</b></div>
  {secondaryText && <div>
    <i>...<u>{secondaryText.substr(matchIndex, searchText.length)}</u>{secondaryText.substr(searchText.length)}</i>
  </div>}
</div>;

const onSearch = (value, callback, searchContent) => {
  callback(searchItems.map(item => {
    const lowerValue = value.toLowerCase();
    const indexInName = item.name.toLowerCase().indexOf(lowerValue);
    if (indexInName !== -1) {
      return {...item, value: <SearchResult
          mainText={item.value}
          searchText={value}
          matchIndex={indexInName}/>};
    } else if (searchContent && value.length > 2) {
      const indexInContent = item.content.toLowerCase().indexOf(lowerValue);
      if (indexInContent !== -1) {
        return {...item, value: <SearchResult
          mainText={item.value}
          secondaryText={item.content.substr(indexInContent, Math.max(100, value.length))}
          searchText={value}
          matchIndex={0}
        />};
      }
    }
  }).filter(i => i));
};

const ContentLink = ({onClick, link, text, active}) => {
  const className = active ? 'sidebar--item-wrapper sidebar--item-wrapper__active' : 'sidebar--item-wrapper';

  return (
    <div className={className}>
      <a onClick={onClick}
         href={link}
         className="sidebar--item">{text}</a>
    </div>
  );
};

export default class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchContent: true
    };
  }

  handleClick(event) {
    event.preventDefault();
    this.props.updateContent(event.target.href);
  }

  handlePick(event) {
    this.props.updateContent(event.href);
  }

  render() {
    const componentLinks = componentItems.map(c => c.href);

    const onInitializeItems = callback => callback(searchItems);
    const handleSearch = (value, callback) => onSearch(value, callback, this.state.searchContent);
    const SearchBar = () => <Autocomplete onInitializeItems={onInitializeItems}
                                          placeholder="Search"
                                          className="sidebar--search phxl"
                                          input={<AutocompleteInput><Input icon="search"/></AutocompleteInput>}
                                          onPick={this.handlePick.bind(this)}
                                          onSearch={handleSearch}
                                          showNoSearchResults={true}/>;

    const components = componentItems
      .map((component, i) => <ContentLink key={i}
                                          onClick={this.handleClick.bind(this)}
                                          link={component.href}
                                          text={component.name}
                                          active={component.href === this.props.activePath}/>);

    return (
      <div className="sidebar">
        <div className="sidebar--header">
          <Icon className="sidebar--icon" src="pivotal_ui_white"/>
          <div className="sidebar--title plxl">Pivotal UI</div>
        </div>
        <SearchBar/>
        <div className="plxl mbl mts mll">
          <Checkbox labelClassName="type-neutral-3 type-sm"
                    checked={this.state.searchContent}
                    onChange={evt => this.setState({searchContent: evt.target.checked})}>
            Search page content</Checkbox>
        </div>
        <div className="sidebar--items">
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="getstarted"
                       text="Get Started"
                       active={['', 'getstarted', 'index.html'].indexOf(this.props.activePath) !== -1}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="faq"
                       text="FAQ"
                       active={'faq' === this.props.activePath}/>
          <Collapse className={componentLinks.indexOf(this.props.activePath) !== -1 ? 'active' : ''}
                    defaultExpanded={componentLinks.indexOf(this.props.activePath) !== -1}
                    header="Components">{components}</Collapse>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="upgradeguide"
                       text="Upgrade Guide"
                       active={'upgradeguide' === this.props.activePath}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="contribute"
                       text="Contribute"
                       active={'contribute' === this.props.activePath}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="versions"
                       text="Versions"
                       active={'versions' === this.props.activePath}/>
          <a className="sidebar--item" href="https://github.com/pivotal-cf/pivotal-ui">Github</a>
        </div>
      </div>
    );
  }
}