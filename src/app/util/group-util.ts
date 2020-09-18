export class GroupUtil {

  public static adminGroupTabs = [
    {
      tabName: 'GROUP CARDS',
      tabActions: [
        {
          actionName: 'ADD USER TO GROUP'
        },
        {
          actionName: 'SHARE CARDS OF GROUP'
        }
      ]
    },
    {
      tabName: 'PENDING CARDS',
      tabActions: []
    },
    {
      tabName: 'AUTHORIZE CARDS',
      tabActions: []
    }
  ];

  public static userGroupTabs = [{
    tabName: 'GROUP CARDS',
    tabActions: []
  }];

  public static apiUrl = 'http://20.193.251.252';
}
