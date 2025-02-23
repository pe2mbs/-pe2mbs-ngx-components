
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ISample_Data } from '../test-crud/test-crud.component';
import { FakeCrudBackend } from 'projects/pe2mbs/ngx-mbs-crud-table/src/lib/mbs-fake-crud';



const Sample_Data: ISample_Data[] = [
    {
        SSN:'172-32-1176',
        gender:'m',
        birthdate:'4/21/1958',
        maiden_name:'Smith',
        last_name:'White',
        first_name:'Johnson',
        address:'10932 Bigge Rd',
        city:'Menlo Park',
        state:'CA',
        zip:'94025',
        phone:'408 496-7223',
        email:'jwhite@domain.com',
        cc_type:'m',
        CCN:'5270-4267-6450-5516',
        cc_cvc:'123',
        cc_expiredate:'2010/06/25'
    },
    {
        SSN:'514-14-8905',
        gender:'f',
        birthdate:'12/22/1944',
        maiden_name:'Amaker',
        last_name:'Borden',
        first_name:'Ashley',
        address:'4469 Sherman Street',
        city:'Goff',
        state:'KS',
        zip:'66428',
        phone:'785-939-6046',
        email:'aborden@domain.com',
        cc_type:'m',
        CCN:'5370-4638-8881-3020',
        cc_cvc:'713',
        cc_expiredate:'2011/02/01'
    },
    {
        SSN:'213-46-8915',
        gender:'f',
        birthdate:'4/21/1958',
        maiden_name:'Pinson',
        last_name:'Green',
        first_name:'Marjorie',
        address:'309 63rd St. #411',
        city:'Oakland',
        state:'CA',
        zip:'94618',
        phone:'415 986-7020',
        email:'mgreen@domain.com',
        cc_type:'v',
        CCN:'4916-9766-5240-6147',
        cc_cvc:'258',
        cc_expiredate:'2009/02/25'
    },
    {
        SSN:'524-02-7657',
        gender:'m',
        birthdate:'3/25/1962',
        maiden_name:'Hall',
        last_name:'Munsch',
        first_name:'Jerome',
        address:'2183 Roy Alley',
        city:'Centennial',
        state:'CO',
        zip:'80112',
        phone:'303-901-6123',
        email:'jmunsch@domain.com',
        cc_type:'m',
        CCN:'5180-3807-3679-8221',
        cc_cvc:'612',
        cc_expiredate:'2010/03/01'
    },
    {
        SSN:'489-36-8350',
        gender:'m',
        birthdate:'1964/09/06',
        maiden_name:'Porter',
        last_name:'Aragon',
        first_name:'Robert',
        address:'3181 White Oak Drive',
        city:'Kansas City',
        state:'MO',
        zip:'66215',
        phone:'816-645-6936',
        email:'raragon@domain.com',
        cc_type:'v',
        CCN:'4929-3813-3266-4295',
        cc_cvc:'911',
        cc_expiredate:'2011/12/01'
    },
    {
        SSN:'514-30-2668',
        gender:'f',
        birthdate:'1986/05/27',
        maiden_name:'Nicholson',
        last_name:'Russell',
        first_name:'Jacki',
        address:'3097 Better Street',
        city:'Kansas City',
        state:'MO',
        zip:'66215',
        phone:'913-227-6106',
        email:'jrussell@domain.com',
        cc_type:'a',
        CCN:'345389698201044',
        cc_cvc:'232',
        cc_expiredate:'2010/01/01'
    },
    {
        SSN:'505-88-5714',
        gender:'f',
        birthdate:'1963/09/23',
        maiden_name:'Mcclain',
        last_name:'Venson',
        first_name:'Lillian',
        address:'539 Kyle Street',
        city:'Wood River',
        state:'NE',
        zip:'68883',
        phone:'308-583-8759',
        email:'lvenson@domain.com',
        cc_type:'d',
        CCN:'30204861594838',
        cc_cvc:'471',
        cc_expiredate:'2011/12/01'
    },
    {
        SSN:'690-05-5315',
        gender:'m',
        birthdate:'1969/10/02',
        maiden_name:'Kings',
        last_name:'Conley',
        first_name:'Thomas',
        address:'570 Nancy Street',
        city:'Morrisville',
        state:'NC',
        zip:'27560',
        phone:'919-656-6779',
        email:'tconley@domain.com',
        cc_type:'v',
        CCN:'4916 4811 5814 8111',
        cc_cvc:'731',
        cc_expiredate:'2010/10/01'
    },
    {
        SSN:'646-44-9061',
        gender:'M',
        birthdate:'1978/01/12',
        maiden_name:'Kurtz',
        last_name:'Jackson',
        first_name:'Charles',
        address:'1074 Small Street',
        city:'New York',
        state:'NY',
        zip:'10011',
        phone:'212-847-4915',
        email:'cjackson@domain.com',
        cc_type:'m',
        CCN:'5218 0144 2703 9266',
        cc_cvc:'892',
        cc_expiredate:'2011/11/01'
    },
    {
        SSN:'421-37-1396',
        gender:'f',
        birthdate:'1980/04/09',
        maiden_name:'Linden',
        last_name:'Davis',
        first_name:'Susan',
        address:'4222 Bedford Street',
        city:'Jasper',
        state:'AL',
        zip:'35501',
        phone:'205-221-9156',
        email:'sdavis@domain.com',
        cc_type:'v',
        CCN:'4916 4034 9269 8783',
        cc_cvc:'33',
        cc_expiredate:'2011/04/01'
    },
    {
        SSN:'461-97-5660',
        gender:'f',
        birthdate:'1975/01/04',
        maiden_name:'Kingdon',
        last_name:'Watson',
        first_name:'Gail',
        address:'3414 Gore Street',
        city:'Houston',
        state:'TX',
        zip:'77002',
        phone:'713-547-3414',
        email:'gwatson@domain.com',
        cc_type:'v',
        CCN:'4532 1753 6071 1112',
        cc_cvc:'694',
        cc_expiredate:'2011/09/01'
    },
    {
        SSN:'660-03-8360',
        gender:'f',
        birthdate:'1953/07/11',
        maiden_name:'Onwunli',
        last_name:'Garrison',
        first_name:'Lisa',
        address:'515 Hillside Drive',
        city:'Lake Charles',
        state:'LA',
        zip:'70629',
        phone:'337-965-2982',
        email:'lgarrison@domain.com',
        cc_type:'v',
        CCN:'4539 5385 7425 5825',
        cc_cvc:'680',
        cc_expiredate:'2011/06/01'
    },
    {
        SSN:'751-01-2327',
        gender:'f',
        birthdate:'1968/02/16',
        maiden_name:'Simpson',
        last_name:'Renfro',
        first_name:'Julie',
        address:'4032 Arron Smith Drive',
        city:'Kaunakakai',
        state:'HI',
        zip:'96748',
        phone:'808-560-1638',
        email:'jrenfro@domain.com',
        cc_type:'m',
        CCN:'5325 3256 9519 6624',
        cc_cvc:'238',
        cc_expiredate:'2009/03/01'
    },
    {
        SSN:'559-81-1301',
        gender:'m',
        birthdate:'1952/01/20',
        maiden_name:'Mcafee',
        last_name:'Heard',
        first_name:'James',
        address:'2865 Driftwood Road',
        city:'San Jose',
        state:'CA',
        zip:'95129',
        phone:'408-370-0031',
        email:'jheard@domain.com',
        cc_type:'v',
        CCN:'4532 4220 6922 9909',
        cc_cvc:'311',
        cc_expiredate:'2010/09/01'
    },
    {
        SSN:'624-84-9181',
        gender:'m',
        birthdate:'1980/01/16',
        maiden_name:'Frazier',
        last_name:'Reyes',
        first_name:'Danny',
        address:'3500 Diane Street',
        city:'San Luis Obispo',
        state:'CA',
        zip:'93401',
        phone:'805-369-0464',
        email:'dreyes@domain.com',
        cc_type:'v',
        CCN:'4532 0065 1968 5602',
        cc_cvc:'713',
        cc_expiredate:'2009/11/01'
    },
    {
        SSN:'449-48-3135',
        gender:'m',
        birthdate:'1982/06/14',
        maiden_name:'Feusier',
        last_name:'Hall',
        first_name:'Mark',
        address:'4986 Chapel Street',
        city:'Houston',
        state:'TX',
        zip:'77077',
        phone:'281-597-5517',
        email:'mhall@domain.com',
        cc_type:'v',
        CCN:'4556 0072 1294 7415',
        cc_cvc:'953',
        cc_expiredate:'2010/05/01'
    },
    {
        SSN:'477-36-0282',
        gender:'m',
        birthdate:'1961/03/10',
        maiden_name:'Vasquez',
        last_name:'Mceachern',
        first_name:'Monte',
        address:'456 Oral Lake Road',
        city:'Minneapolis',
        state:'MN',
        zip:'55401',
        phone:'952-412-3707',
        email:'mmceachern@domain.com',
        cc_type:'m',
        CCN:'5527 1247 5046 7780',
        cc_cvc:'889',
        cc_expiredate:'2009/03/01'
    },
    {
        SSN:'458-02-6124',
        gender:'m',
        birthdate:'1955/09/20',
        maiden_name:'Pennebaker',
        last_name:'Diaz',
        first_name:'Christopher',
        address:'582 Thrash Trail',
        city:'Dallas',
        state:'TX',
        zip:'75247',
        phone:'903-624-9156',
        email:'cdiaz@domain.com',
        cc_type:'m',
        CCN:'5299 1561 5689 1938',
        cc_cvc:'584',
        cc_expiredate:'2011/08/01'
    },
    {
        SSN:'044-34-6954',
        gender:'m',
        birthdate:'1967/05/28',
        maiden_name:'Simpson',
        last_name:'Lowe',
        first_name:'Tim',
        address:'1620 Maxwell Street',
        city:'East Hartford',
        state:'CT',
        zip:'6108',
        phone:'860-755-0293',
        email:'tlowe@domain.com',
        cc_type:'m',
        CCN:'5144 8691 2776 1108',
        cc_cvc:'616',
        cc_expiredate:'2011/10/01'
    },
    {
        SSN:'587-03-2682',
        gender:'f',
        birthdate:'1958/10/24',
        maiden_name:'Dickerson',
        last_name:'Oyola',
        first_name:'Lynette',
        address:'2489 O Conner Street',
        city:'Pascagoula',
        state:'MS',
        zip:'39567',
        phone:'228-938-2056',
        email:'loyola@domain.com',
        cc_type:'v',
        CCN:'4532 9929 3036 9308',
        cc_cvc:'991',
        cc_expiredate:'2011/07/01'
    },
    {
        SSN:'421-90-3440',
        gender:'f',
        birthdate:'1953/07/17',
        maiden_name:'Kroeger',
        last_name:'Morrison',
        first_name:'Adriane',
        address:'4696 Retreat Avenue',
        city:'Birmingham',
        state:'AL',
        zip:'35209',
        phone:'205-276-1807',
        email:'amorrison@domain.com',
        cc_type:'v',
        CCN:'4539 0031 3703 0728',
        cc_cvc:'322',
        cc_expiredate:'2009/12/01'
    },
    {
        SSN:'451-80-3526',
        gender:'m',
        birthdate:'1950/06/09',
        maiden_name:'Parmer',
        last_name:'Santos',
        first_name:'Thomas',
        address:'173 Lunetta Street',
        city:'Fort Worth',
        state:'TX',
        zip:'76104',
        phone:'940-859-1393',
        email:'tsantos@domain.com',
        cc_type:'v',
        CCN:'4716 6984 4983 6160',
        cc_cvc:'767',
        cc_expiredate:'2011/09/01'
    },
    {
        SSN:'300-62-3266',
        gender:'m',
        birthdate:'1965/02/10',
        maiden_name:'Spain',
        last_name:'Faulkner',
        first_name:'Victor',
        address:'1843 Olive Street',
        city:'Toledo',
        state:'OH',
        zip:'43602',
        phone:'419-340-3832',
        email:'vfaulkner@domain.com',
        cc_type:'m',
        CCN:'5548 0246 6336 5664',
        cc_cvc:'276',
        cc_expiredate:'2010/02/01'
    },
    {
        SSN:'322-84-2281',
        gender:'m',
        birthdate:'1977/08/19',
        maiden_name:'Miley',
        last_name:'Iorio',
        first_name:'Albert',
        address:'4899 University Hill Road',
        city:'Springfield',
        state:'IL',
        zip:'62701',
        phone:'217-615-6419',
        email:'aiorio@domain.com',
        cc_type:'v',
        CCN:'4916 6734 7572 5015',
        cc_cvc:'347',
        cc_expiredate:'2010/02/01'
    },
    {
        SSN:'465-73-5022',
        gender:'f',
        birthdate:'1964/06/20',
        maiden_name:'Summers',
        last_name:'Kaminski',
        first_name:'Teresa',
        address:'1517 Gambler Lane',
        city:'Houston',
        state:'TX',
        zip:'77006',
        phone:'281-906-2148',
        email:'tkaminski@domain.com',
        cc_type:'m',
        CCN:'5399 0706 4128 0178',
        cc_cvc:'721',
        cc_expiredate:'2009/10/01'
    },
    {
        SSN:'612-20-6832',
        gender:'m',
        birthdate:'1979/08/18',
        maiden_name:'Banas',
        last_name:'Edwards',
        first_name:'Rick',
        address:'4254 Walkers Ridge Way',
        city:'Gardena',
        state:'CA',
        zip:'90248',
        phone:'626-991-3620',
        email:'redwards@domain.com',
        cc_type:'m',
        CCN:'5293 8502 0071 3058',
        cc_cvc:'701',
        cc_expiredate:'2010/08/01'
    },
    {
        SSN:'687-05-8365',
        gender:'f',
        birthdate:'1976/05/24',
        maiden_name:'Robbins',
        last_name:'Peacock',
        first_name:'Stacey',
        address:'3396 Nancy Street',
        city:'Raleigh',
        state:'NC',
        zip:'27612',
        phone:'919-571-2339',
        email:'speacock@domain.com',
        cc_type:'m',
        CCN:'5495 8602 4508 6804',
        cc_cvc:'436',
        cc_expiredate:'2011/02/01'
    },
    {
        SSN:'205-52-0027',
        gender:'f',
        birthdate:'1950/03/26',
        maiden_name:'Sanford',
        last_name:'Nelson',
        first_name:'Agnes',
        address:'4213 High Meadow Lane',
        city:'Avoca',
        state:'PA',
        zip:'18641',
        phone:'570-480-8704',
        email:'anelson@domain.com',
        cc_type:'m',
        CCN:'5413 4428 0145 0036',
        cc_cvc:'496',
        cc_expiredate:'2010/02/01'
    },
    {
        SSN:'404-12-2154',
        gender:'f',
        birthdate:'1984/09/21',
        maiden_name:'Garcia',
        last_name:'Townsend',
        first_name:'Mireille',
        address:'2877 Glen Street',
        city:'Paducah',
        state:'KY',
        zip:'42003',
        phone:'270-408-7254',
        email:'mtownsend@domain.com',
        cc_type:'v',
        CCN:'4539 8219 0484 7598',
        cc_cvc:'710',
        cc_expiredate:'2011/03/01'
    },
    {
        SSN:'151-32-2558',
        gender:'f',
        birthdate:'1952/11/19',
        maiden_name:'Stockdale',
        last_name:'Zwick',
        first_name:'Rebecca',
        address:'784 Beechwood Avenue',
        city:'Piscataway',
        state:'NJ',
        zip:'8854',
        phone:'908-814-6733',
        email:'rzwick@domain.com',
        cc_type:'v',
        CCN:'5252 5971 4219 4116',
        cc_cvc:'173',
        cc_expiredate:'2011/02/01'
    }
]

export class FakeSample_Data extends FakeCrudBackend<ISample_Data>
{
    public get uri(): string { return ( '/api/demo-table' ) }

    constructor()
    {
        super( Sample_Data, 'SSN' );
        return;
    }
}
