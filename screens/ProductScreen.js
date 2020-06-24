import * as React from 'react';
import { Text, Icon, Tab, Tabs, TabHeading, Container } from 'native-base';

import Tab1 from './ListScreen';
import Tab2 from './GridScreen';

export default function ProductScreen({ navigation }) {
    return (
      <Container>
        <Tabs style={{ backgroundColor: '#fff'}}>
          <Tab heading={ <TabHeading style={{ backgroundColor: '#000'}}><Icon name="list" /><Text>List</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: '#000'}}><Icon name="apps" /><Text>Grid</Text></TabHeading>}>
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
    );
}
