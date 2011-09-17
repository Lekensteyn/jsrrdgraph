/**
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.

 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA

 **/

"use strict";

function strftime (fmt, time)
{
	var d = new Date(time*1000);

	var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	var fdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	var fmonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	function pad2 (number) 
	{ 
		return (number < 10 ? '0' : '') + number 
	};

	function pad3(number) 
	{ 
		return (number < 10 ? '00' : number < 100 ? '0' : '') + number 
	};

	function lpad (str, padString, length) 
	{ 
		while (str.length < length) 
			str = padString + str; 
		return str; 
	};
		
	function format(match, opt) 
	{
		if (match === '%%') return '%';		

		switch (opt) {
			case 'a':
				return days[d.getDay()];
				break;
			case 'A':
				return fdays[d.getDay()];
				break;
			case 'b':
				return months[d.getMonth()];
				break;
			case 'B':
				return fmonths[d.getMonth()];
				break;
			case 'c':
				return d.toLocaleString();
				break;
			case 'd':
				return pad2(d.getDate());	
				break;
			case 'H':
				return pad2(d.getHours());	
				break;
			case 'I':	
				var hours = d.getHours()%12;
				return pad2(hours === 0 ? 12 : hours);
				break;
			case 'j':
				var d01 = new Date (d.getFullYear(), 0, 1);
				return pad3(Math.ceil((d.getTime()-d01.getTime())/86400000)+1);
				break;
			case 'm':	
				return pad2(d.getMonth());
				break;
			case 'M':
				return pad2(d.getMinutes());
				break;
			case 'p':
				return d.getHours() >= 12 ? 'PM' : 'AM';
				break;
			case 's':
				return pad2(d.getSeconds());
				break;
			case 'S':
				return d.getTime()/1000;
				break;
			case 'u':
        return d.getDay() === 0 ? 7 : d.getDay();
				break;
			case 'U': 
				var d01 = new Date(d.getFullYear(),0,1);
				return pad2(Math.round((Math.ceil((d.getTime()-d01.getTime())/86400000)+1 + 6 - d.getDay())/7)); 
				break;
			case 'V': 
				var d01 = new Date(d.getFullYear(), 0, 1);
				var w = Math.round((Math.ceil((d.getTime()-d01.getTime())/86400000)+1 + 7 - (d.getDay() === 0 ? 7 : d.getDay()))/7);
				var d31 = new Date(d.getFullYear(), 11, 31);
				if (d01.getDay() < 4 && d01.getDay() > 1) w++;
				if (w === 53 && d31.getDay() < 4) {
					w = 1;
				} else if (w === 0) {
					d31 = new Date(d.getFullYear()-1, 11, 31);
					d01 = new Date(d31.getFullYear(), 0, 1);
					w = Math.round((Math.ceil((d31.getTime()-d01.getTime())/86400000)+1 + 7 - (d31.getDay() === 0 ? 7 : d31.getDay()))/7);
					if (d01.getDay() < 4 && d01.getDay() > 1) w++;
					if (w === 53 && d31.getDay() < 4) w = 1;
				}
				return pad2(w);
				break;
			case 'w':
				return d.getDay();
				break;
			case 'W': 
				var d01 = new Date(d.getFullYear(),0,1); 
				return pad2(Math.round((Math.ceil((d.getTime()-d01.getTime())/86400000)+1 + 7 - (d.getDay() === 0 ? 7 : d.getDay()))/7));
				break;
			case 'x':
				return pad2(d.getDate())+'/'+pad2(d.getMonth())+'/'+d.getFullYear()
				break;
			case 'X':
				return pad2(d.getHours())+':'+pad2(d.getMinutes())+':'+pad2(d.getSeconds());
				break;
			case 'y':	
				return pad2(d.getFullYear()%100);
				break;
			case 'Y':
				return d.getFullYear();
				break;
			case 'Z':
				return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
				break;
			default:
				return match;
		}
	};
	return fmt.replace(/%([aAbBcdHIjmMpsSUVwWxXyYZ%])/g, format);
};
