const {
  formatLabellingReservation,
  formatAssignmentProgress,
  formatAccountLabellings,
  formatCategoryLabels,
  formatCategoriesLabelsId,
  formatAccountsId,
  groupLabels
} = require("../../helper/formater")

describe("formatter test", () => {
  test("fomat accounts reserved", () => {
    const expectedResult = [
      {
        "assignment_id":133,
        "account_id":34176
      },
      {
        "assignment_id":133,
        "account_id":34177
      }
    ]
    const assignment = {
      "id": 133
    }
    const data = [
      {
          "id": 34176,
          "account_id": "262303073865784",
          "account_name": "กองระบาดวิทยา กรมควบคุมโรค",
          "like_count": 32351,
          "link_url": "https://www.facebook.com/ BureauofEpidemiology /",
          "channel_id": 1,
          "country_id": 1
      },
      {
          "id": 34177,
          "account_id": "336018459784881",
          "account_name": "Phucha Florist - ภูชา ฟลอริส",
          "like_count": 3305,
          "link_url": "https://www.facebook.com/ PhuchaFlorist /",
          "channel_id": 1,
          "country_id": 1
      },
    ]
    const result = formatLabellingReservation(data, assignment)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  });
  test("format accounts Id", () => {
    const expectedResult = [ "262303073865784", "336018459784881" ]
    const data = [
      {
          "id": 34176,
          "account_id": "262303073865784",
          "account_name": "กองระบาดวิทยา กรมควบคุมโรค",
          "like_count": 32351,
          "link_url": "https://www.facebook.com/ BureauofEpidemiology /",
          "channel_id": 1,
          "country_id": 1
      },
      {
          "id": 34177,
          "account_id": "336018459784881",
          "account_name": "Phucha Florist - ภูชา ฟลอริส",
          "like_count": 3305,
          "link_url": "https://www.facebook.com/ PhuchaFlorist /",
          "channel_id": 1,
          "country_id": 1
      },
    ]
    const result = formatAccountsId(data)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
  test("format categories label with type of profile and interest", () => {
    const expectedResult = {
      typeOfProfile:[ 1, 2 ],
      topicByBusiness:[],
      interest:[4],
      demographicOrTarget:[]
    }
    const data = {
      typeOfProfile:[
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      topicByBusiness:[],
      interest:[
        {
          id: 4
        }
      ],
      demographicOrTarget:[]
    }
    const result = formatCategoriesLabelsId(data)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
  test("format categories label with type of profile and interest", () => {
    const expectedResult = {
      typeOfProfile:[ ],
      topicByBusiness:[ 5, 6 ],
      interest:[ 4 ],
      demographicOrTarget:[ 9, 29 ]
    }
    const data = {
      typeOfProfile:[],
      topicByBusiness:[
        {
          id: 5
        },
        {
          id: 6
        }
      ],
      interest:[
        {
          id: 4
        }
      ],
      demographicOrTarget:[
        {
          id: 9
        },
        {
          id: 29
        }
      ]
    }
    const result = formatCategoriesLabelsId(data)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
  test("format accounts labelling", () => {
    const expectedResult = [
      {
        booking_id : 100,
        label_id: 1
      },
      {
        booking_id : 100,
        label_id: 2
      },
      {
        booking_id : 100,
        label_id: 3
      },
    ]
    const data = [
      {
        id:1,
        name: "label1"
      },
      {
        id:2,
        name: "label2"
      },
      {
        id:3,
        name: "label3"
      }
    ]
    const accountResevedId = 100
    const result = formatAccountLabellings(accountResevedId, data)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
  test("format assignment and progress", () => {
    const expectedResult = [
      {
        id:140,
        category:"Topic by business",
        channel:"facebook",
        assignBy:"jim",
        assignTo:"aof",
        progress:"0/10",
        startPoint:0, 
        total:10,
        status:"disable"
      },
      {
        id:141,
        category:"Type of profile",
        channel:"facebook",
        assignBy:"jim",
        assignTo:"tim",
        progress:"4/100",
        startPoint:4, 
        total:100,
        status:"disable"
      },
      {
        id:142,
        category:"Topic by business",
        channel:"facebook",
        assignBy:"jim",
        assignTo:"tim",
        progress:"1/10",
        startPoint:1, 
        total:10,
        status:"enable"
      }
    ]
    const progress =[ 0, 4, 1]
    const assignment =[
      {
        id: 140,
        category_id: 37,
        id_channel: 1,
        assign_by: 1,
        assign_to: 3,
        created_at: '2019-09-13T10:05:13.000Z',
        updated_at: null,
        total: 10,
        status: 'disable',
        label: {
          id: 37,
          name: 'Topic by business',
          parent_id: null,
          category_group: 2,
          hierarchyLevel: 1
        },
        channel: { id: 1, channel_name: 'facebook' },
        assignBy: { id: 1, name: 'jim' },
        assignTo: { id: 3, name: 'aof' }
      },
      {
        id: 141,
        category_id: 19,
        id_channel: 1,
        assign_by: 1,
        assign_to: 2,
        created_at: '2019-09-16T11:30:07.000Z',
        updated_at: null,
        total: 100,
        status: 'disable',
        label: {
          id: 19,
          name: 'Type of profile',
          parent_id: null,
          category_group: 1,
          hierarchyLevel: 1
        },
        channel: { id: 1, channel_name: 'facebook' },
        assignBy: { id: 1, name: 'jim' },
        assignTo: { id: 2, name: 'tim' }
      },
      {
        id: 142,
        category_id: 37,
        id_channel: 1,
        assign_by: 1,
        assign_to: 2,
        created_at: '2019-09-19T08:59:53.000Z',
        updated_at: null,
        total: 10,
        status: 'enable',
        label: {
          id: 37,
          name: 'Topic by business',
          parent_id: null,
          category_group: 2,
          hierarchyLevel: 1
        },
        channel: { id: 1, channel_name: 'facebook' },
        assignBy: { id: 1, name: 'jim' },
        assignTo: { id: 2, name: 'tim' }
      }
    ]

    const result = formatAssignmentProgress(assignment, progress)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
  test("format category labels", () => {
    const expectedResult = {
      id:1,
      name:"business",
      labels:[
        {
          id:2,
          name:"female"
        },
        {
          id:3,
          name:"gender"
        },
        {
          id:3,
          name:"male"
        }
      ]
    }
    const category = {
      id: 1,
      name: "business"
    }
    const labels = [
      {
        id:2,
        name:"female"
      },
      {
        id:3,
        name:"gender"
      },
      {
        id:3,
        name:"male"
      }
    ]
    const result = formatCategoryLabels(category, labels)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
  test("format group labels", () => {
    const expectedResult = [
      {
        id: 1699,
        account_id: 34176,
        assignment_id: 141,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object], [Object], [Object], [Object], [Object], [Object] ],
        account: {
          id: 34176,
          account_id: '262303073865784',
          account_name: 'กองระบาดวิทยา กรมควบคุมโรค',
          like_count: 32351,
          link_url: 'https://www.facebook.com/ BureauofEpidemiology /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },{
        id: 1700,
        account_id: 34177,
        assignment_id: 141,
        label_at: null,
        status: '',
        account_labellings: [ [Object], [Object] ],
        account: {
          id: 34177,
          account_id: '336018459784881',
          account_name: 'Phucha Florist - ภูชา ฟลอริส',
          like_count: 3305,
          link_url: 'https://www.facebook.com/ PhuchaFlorist /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },{
        id: 1701,
        account_id: 34178,
        assignment_id: 141,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
        account: {
          id: 34178,
          account_id: '148822938480546',
          account_name: '0.2Memories',
          like_count: 442,
          link_url: 'https://www.facebook.com/0.2Memories/',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1702,
        account_id: 34179,
        assignment_id: 141,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object], [Object] ],
        account: {
          id: 34179,
          account_id: '416649445043836',
          account_name: 'รวมเด็ก ต.อ.พ.น ม.ต้น&ม.ปลาย:p',
          like_count: 1262,
          link_url: 'https://www.facebook.com/000T.P.N/',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
    ]
    const accountsLabellings = [
      {
        id: 1699,
        account_id: 34176,
        assignment_id: 141,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object] ],
        account: {
          id: 34176,
          account_id: '262303073865784',
          account_name: 'กองระบาดวิทยา กรมควบคุมโรค',
          like_count: 32351,
          link_url: 'https://www.facebook.com/ BureauofEpidemiology /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1700,
        account_id: 34177,
        assignment_id: 141,
        label_at: null,
        status: '',
        account_labellings: [ [Object], [Object] ],
        account: {
          id: 34177,
          account_id: '336018459784881',
          account_name: 'Phucha Florist - ภูชา ฟลอริส',
          like_count: 3305,
          link_url: 'https://www.facebook.com/ PhuchaFlorist /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1701,
        account_id: 34178,
        assignment_id: 141,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
        account: {
          id: 34178,
          account_id: '148822938480546',
          account_name: '0.2Memories',
          like_count: 442,
          link_url: 'https://www.facebook.com/0.2Memories/',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1702,
        account_id: 34179,
        assignment_id: 141,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object], [Object] ],
        account: {
          id: 34179,
          account_id: '416649445043836',
          account_name: 'รวมเด็ก ต.อ.พ.น ม.ต้น&ม.ปลาย:p',
          like_count: 1262,
          link_url: 'https://www.facebook.com/000T.P.N/',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1799,
        account_id: 34176,
        assignment_id: 142,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object] ],
        account: {
          id: 34176,
          account_id: '262303073865784',
          account_name: 'กองระบาดวิทยา กรมควบคุมโรค',
          like_count: 32351,
          link_url: 'https://www.facebook.com/ BureauofEpidemiology /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1809,
        account_id: 34176,
        assignment_id: 143,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object], [Object] ],
        account: {
          id: 34176,
          account_id: '262303073865784',
          account_name: 'กองระบาดวิทยา กรมควบคุมโรค',
          like_count: 32351,
          link_url: 'https://www.facebook.com/ BureauofEpidemiology /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      },
      {
        id: 1905,
        account_id: 34176,
        assignment_id: 144,
        label_at: null,
        status: 'enable',
        account_labellings: [ [Object] ],
        account: {
          id: 34176,
          account_id: '262303073865784',
          account_name: 'กองระบาดวิทยา กรมควบคุมโรค',
          like_count: 32351,
          link_url: 'https://www.facebook.com/ BureauofEpidemiology /',
          channel_id: 1,
          country_id: 1,
          channel: [Object]
        }
      }
    ]
    const result = groupLabels(accountsLabellings)
    expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
  })
});
